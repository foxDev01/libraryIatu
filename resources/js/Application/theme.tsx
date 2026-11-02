import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

export type ColorMode = 'light' | 'dark';

/** Key used by the inline bootstrap script in app.blade.php as well. */
const STORAGE_KEY = 'libraryiatu.color-mode';

interface ColorModeValue {
    mode: ColorMode;
    toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeValue | null>(null);

export function useColorMode(): ColorModeValue {
    const value = useContext(ColorModeContext);

    if (value === null) {
        throw new Error('useColorMode must be used within an AppThemeProvider');
    }

    return value;
}

function readStoredMode(): ColorMode | null {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);

        return stored === 'light' || stored === 'dark' ? stored : null;
    } catch {
        return null;
    }
}

function readSystemMode(): ColorMode {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function createAppTheme(mode: ColorMode): Theme {
    const isDark = mode === 'dark';

    return createTheme({
        palette: {
            mode,
            primary: {
                main: isDark ? '#7aa2ff' : '#2563eb',
                contrastText: isDark ? '#0b1220' : '#ffffff',
            },
            secondary: {
                main: isDark ? '#c9a3ff' : '#7c3aed',
                contrastText: isDark ? '#0b1220' : '#ffffff',
            },
            background: {
                default: isDark ? '#0b1220' : '#eef2f9',
                paper: isDark ? '#141d2b' : '#ffffff',
            },
            text: {
                primary: isDark ? '#e6edf7' : '#10203a',
                secondary: isDark ? '#9fb0c7' : '#54657f',
            },
            divider: isDark ? '#25334a' : '#dbe3ef',
        },
        shape: {
            borderRadius: 10,
        },
        typography: {
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            h4: { fontWeight: 600 },
            h5: { fontWeight: 600 },
            h6: { fontWeight: 600 },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        transition: 'background-color 200ms ease, color 200ms ease',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: { backgroundImage: 'none' },
                },
            },
            MuiButton: {
                defaultProps: { disableElevation: true },
            },
            MuiCard: {
                defaultProps: { elevation: 0 },
            },
        },
    });
}

interface AppThemeProviderProps {
    children: React.ReactNode;
}

/**
 * Provides the light/dark palette to the whole SPA.
 *
 * The initial mode comes from the user's explicit choice (localStorage) or,
 * when there is none, from the operating system preference. The choice is
 * mirrored onto <html> so the page background is correct even before React
 * mounts (see the bootstrap script in app.blade.php).
 */
export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<ColorMode>(() => readStoredMode() ?? readSystemMode());

    useEffect(() => {
        document.documentElement.dataset.theme = mode;
        document.documentElement.style.colorScheme = mode;
    }, [mode]);

    // Follow the OS preference until the user picks a theme explicitly.
    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (event: MediaQueryListEvent) => {
            if (readStoredMode() === null) {
                setMode(event.matches ? 'dark' : 'light');
            }
        };

        media.addEventListener('change', handleChange);

        return () => {
            media.removeEventListener('change', handleChange);
        };
    }, []);

    const toggleColorMode = useCallback(() => {
        setMode((current) => {
            const next: ColorMode = current === 'dark' ? 'light' : 'dark';

            try {
                window.localStorage.setItem(STORAGE_KEY, next);
            } catch {
                // Storage may be unavailable (private mode, blocked cookies):
                // the theme still switches, it just will not be remembered.
            }

            return next;
        });
    }, []);

    const value = useMemo<ColorModeValue>(
        () => ({ mode, toggleColorMode }),
        [mode, toggleColorMode],
    );

    const theme = useMemo(() => createAppTheme(mode), [mode]);

    return (
        <ColorModeContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
