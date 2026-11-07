import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

import BooksList from './BooksList';
import { Book } from '../../types';

type SortOrder = 'asc' | 'desc';

const ALL_TYPES = 'all';

/**
 * Сравнение названий без учёта регистра и разницы «е»/«ё» — так поиск
 * по-русски ведёт себя ожидаемо («Основы» находится по «основы» и «ё»).
 */
const normalize = (value: string): string => value.toLocaleLowerCase('ru').replace(/ё/g, 'е');

/**
 * Поиск, фильтр по типу и сортировка для списка книг.
 *
 * Работает на клиенте: список книги одной группы невелик, а фильтрация
 * без запросов к серверу даёт мгновенный отклик. Компонент общий для
 * страницы группы и страницы дисциплины.
 */
const BooksBrowser: React.FC<{ books: Book[] }> = ({ books }) => {
    const [query, setQuery] = useState('');
    const [typeName, setTypeName] = useState<string>(ALL_TYPES);
    const [sort, setSort] = useState<SortOrder>('asc');

    const types = useMemo(() => {
        const unique = new Set<string>();

        books.forEach((book) => {
            if (book.type_name) {
                unique.add(book.type_name);
            }
        });

        return Array.from(unique).sort((first, second) => first.localeCompare(second, 'ru'));
    }, [books]);

    const visibleBooks = useMemo(() => {
        const needle = normalize(query.trim());

        return books
            .filter((book) => typeName === ALL_TYPES || book.type_name === typeName)
            .filter((book) => needle === '' || normalize(book.bookname).includes(needle))
            .sort((first, second) => (sort === 'asc' ? 1 : -1)
                * first.bookname.localeCompare(second.bookname, 'ru', { sensitivity: 'base' }));
    }, [books, query, typeName, sort]);

    const isFiltering = query.trim() !== '' || typeName !== ALL_TYPES;

    const resetFilters = () => {
        setQuery('');
        setTypeName(ALL_TYPES);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, minHeight: 0 }}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                useFlexGap
                sx={{ flexWrap: 'wrap', alignItems: 'center' }}
            >
                <TextField
                    label="Поиск по названию"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    size="small"
                    sx={{ flex: '1 1 260px', minWidth: { xs: '100%', sm: 220 } }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                            endAdornment: query === '' ? null : (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        aria-label="Очистить поиск"
                                        onClick={() => setQuery('')}
                                        edge="end"
                                    >
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                {types.length > 1 ? (
                    <TextField
                        select
                        label="Тип книги"
                        value={typeName}
                        onChange={(event) => setTypeName(event.target.value)}
                        size="small"
                        sx={{ minWidth: { xs: '100%', sm: 200 } }}
                    >
                        <MenuItem value={ALL_TYPES}>Все типы</MenuItem>
                        {types.map((name) => (
                            <MenuItem key={name} value={name}>{name}</MenuItem>
                        ))}
                    </TextField>
                ) : null}

                <TextField
                    select
                    label="Сортировка"
                    value={sort}
                    onChange={(event) => setSort(event.target.value as SortOrder)}
                    size="small"
                    sx={{ minWidth: { xs: '100%', sm: 200 } }}
                >
                    <MenuItem value="asc">По названию (А–Я)</MenuItem>
                    <MenuItem value="desc">По названию (Я–А)</MenuItem>
                </TextField>
            </Stack>

            <Typography variant="caption" aria-live="polite" sx={{ color: 'text.secondary' }}>
                {isFiltering
                    ? `Найдено: ${visibleBooks.length} из ${books.length}`
                    : `Всего книг: ${books.length}`}
            </Typography>

            {visibleBooks.length > 0 ? (
                <BooksList books={visibleBooks} />
            ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Typography sx={{ color: 'text.secondary' }} gutterBottom>
                        Ничего не найдено.
                    </Typography>
                    <Button onClick={resetFilters}>Сбросить фильтры</Button>
                </Box>
            )}
        </Box>
    );
};

export default BooksBrowser;
