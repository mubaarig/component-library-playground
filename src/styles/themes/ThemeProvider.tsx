import React, { createContext, useContext, useEffect, useState } from 'react';
import { darkColors, lightColors, type ColorTokens } from '../../tokens/colors';

// Public type for the user’s *preference* (what they pick in your UI)
export type Theme = 'light' | 'dark' | 'system';

// Everything the context will expose to consumers via useTheme()
interface ThemeContextType {
  theme: Theme;                          // user’s choice
  setTheme: (theme: Theme) => void;      // setter to change choice
  resolvedTheme: 'light' | 'dark';       // actual theme in use
  colors: ColorTokens;                   // token set for the current theme
}

// Create the context with an undefined default so misuse throws in the hook
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Start with "system"; you could also hydrate from localStorage here
  const [theme, setTheme] = useState<Theme>('system');

  // The effective theme actually applied to the UI
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Compute and set the effective theme based on user choice + system setting
    const updateResolvedTheme = () => {
      if (theme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setResolvedTheme(systemPrefersDark ? 'dark' : 'light');
      } else {
        setResolvedTheme(theme);
      }
    };

    // Run once immediately when theme changes
    updateResolvedTheme();

    // Watch system changes *only* if user opted into "system"
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateResolvedTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    // Clean up when effect re-runs or unmounts
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Pick tokens for current effective theme
  const colors = resolvedTheme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, colors }}>
      {/* 
        Expose the theme to CSS via data attribute,
        and set a background to avoid a flash on load/transition 
      */}
      <div data-theme={resolvedTheme} style={{ background: colors.background, minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Consumer hook; enforces usage under the provider
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
