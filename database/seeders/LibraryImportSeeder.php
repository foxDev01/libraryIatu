<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use RuntimeException;

/**
 * Imports the original MySQL dump (libraryiatu.sql) into the SQLite database.
 *
 * The dump is UTF-8 encoded and was produced by mysqldump, so every INSERT
 * statement contains plain SQL tuples that can be parsed without a MySQL
 * server. Nova tables (action_events) are ignored because Nova is no longer
 * part of the application.
 */
class LibraryImportSeeder extends Seeder
{
    /**
     * Tables in an order that satisfies the foreign key constraints.
     *
     * @var array<int, string>
     */
    protected array $tables = [
        'users',
        'directions',
        'group_names',
        'types',
        'disciplines',
        'books',
        'groups',
        'group_books',
        'group_disciplines',
        'questions',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = base_path('libraryiatu.sql');

        if (! is_file($path)) {
            throw new RuntimeException("Source dump not found: {$path}");
        }

        $contents = file_get_contents($path);
        $statements = $this->insertStatements($contents);

        foreach (array_reverse($this->tables) as $table) {
            DB::table($table)->delete();
        }

        foreach ($this->tables as $table) {
            if (! isset($statements[$table])) {
                $this->command?->warn("No data found for {$table}.");

                continue;
            }

            $columns = $statements[$table]['columns'];

            foreach (array_chunk($statements[$table]['rows'], 100) as $chunk) {
                DB::table($table)->insert(array_map(
                    fn (array $row) => array_combine($columns, $row),
                    $chunk
                ));
            }

            $this->command?->info(sprintf(
                'Imported %d rows into %s.',
                count($statements[$table]['rows']),
                $table
            ));
        }
    }

    /**
     * Extract all INSERT statements from the dump.
     *
     * @return array<string, array{columns: array<int, string>, rows: array<int, array<int, mixed>>}>
     */
    protected function insertStatements(string $sql): array
    {
        $statements = [];
        $buffer = null;

        foreach (preg_split('/\r?\n/', $sql) as $line) {
            if ($buffer === null) {
                if (! str_starts_with(ltrim($line), 'INSERT INTO')) {
                    continue;
                }

                $buffer = $line;
            } else {
                $buffer .= "\n".$line;
            }

            if (str_ends_with(rtrim($buffer), ';')) {
                $parsed = $this->parseStatement($buffer);

                if ($parsed !== null) {
                    $statements[$parsed['table']] = [
                        'columns' => $parsed['columns'],
                        'rows' => $parsed['rows'],
                    ];
                }

                $buffer = null;
            }
        }

        return $statements;
    }

    /**
     * Parse a single INSERT statement into columns and row tuples.
     *
     * @return array{table: string, columns: array<int, string>, rows: array<int, array<int, mixed>>}|null
     */
    protected function parseStatement(string $statement): ?array
    {
        if (! preg_match('/^INSERT INTO `([^`]+)`\s*\((.*?)\)\s*VALUES\s*(.+);$/s', trim($statement), $matches)) {
            return null;
        }

        $columns = array_map(
            fn (string $column) => trim($column, " `\t\r\n"),
            explode(',', $matches[2])
        );

        return [
            'table' => $matches[1],
            'columns' => $columns,
            'rows' => $this->parseRows($matches[3]),
        ];
    }

    /**
     * Parse a comma separated list of SQL row tuples.
     *
     * @return array<int, array<int, mixed>>
     */
    protected function parseRows(string $values): array
    {
        $rows = [];
        $row = [];
        $token = '';
        $length = strlen($values);
        $inString = false;
        $inRow = false;
        $tokenQuoted = false;

        for ($i = 0; $i < $length; $i++) {
            $char = $values[$i];

            if ($inString) {
                if ($char === '\\' && $i + 1 < $length) {
                    $token .= $this->unescape($values[++$i]);
                } elseif ($char === "'") {
                    // A doubled quote is an escaped single quote.
                    if ($i + 1 < $length && $values[$i + 1] === "'") {
                        $token .= "'";
                        $i++;
                    } else {
                        $inString = false;
                        $tokenQuoted = true;
                    }
                } else {
                    $token .= $char;
                }

                continue;
            }

            // Whitespace between tokens is never part of a value.
            if (ctype_space($char)) {
                continue;
            }

            if ($char === "'") {
                $inString = true;
                $tokenQuoted = true;

                continue;
            }

            if ($char === '(' && ! $inRow) {
                $inRow = true;
                $row = [];
                $token = '';
                $tokenQuoted = false;

                continue;
            }

            if ($char === ')' && $inRow) {
                $row[] = $this->castValue($token, $tokenQuoted);
                $rows[] = $row;
                $inRow = false;
                $token = '';
                $tokenQuoted = false;

                continue;
            }

            if ($char === ',' && $inRow) {
                $row[] = $this->castValue($token, $tokenQuoted);
                $token = '';
                $tokenQuoted = false;

                continue;
            }

            if (in_array($char, ['(', ')', ','], true)) {
                continue;
            }

            if ($inRow) {
                $token .= $char;
            }
        }

        return $rows;
    }

    /**
     * Convert a MySQL escape sequence into the character it represents.
     */
    protected function unescape(string $char): string
    {
        return match ($char) {
            '0' => "\0",
            'b' => "\x08",
            'n' => "\n",
            'r' => "\r",
            't' => "\t",
            'Z' => "\x1a",
            default => $char,
        };
    }

    /**
     * Convert a raw SQL token into its PHP representation.
     */
    protected function castValue(string $token, bool $quoted): mixed
    {
        if (! $quoted) {
            $token = trim($token);

            if (strcasecmp($token, 'NULL') === 0) {
                return null;
            }

            if (preg_match('/^-?\d+$/', $token)) {
                return (int) $token;
            }

            if (is_numeric($token)) {
                return (float) $token;
            }
        }

        return $token;
    }
}
