// A strongly-typed palette used by your UI. Keeping the structure consistent
// between light and dark themes makes swapping themes trivial.
export interface ColorTokens {
  // Brand or accent color scale (10 steps).
  primary: {
    50: string;   // lightest tint
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;  // base brand color (commonly used for buttons/links)
    600: string;
    700: string;
    800: string;
    900: string;  // darkest shade
  };

  // Neutral/gray scale for backgrounds, borders, text, dividers, etc.
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };

  // Semantic status colors
  success: string;  // confirmations, positive states
  warning: string;  // cautionary states
  error: string;    // errors/destructive actions

  // Page-level and container-level surfaces
  background: string; // app/page background
  surface: string;    // cards, panels, elevated surfaces

  // Text color roles
  text: {
    primary: string;   // default body text
    secondary: string; // less prominent text, captions
    disabled: string;  // disabled/placeholder text
  };
}

// --- Light theme tokens ---
// Scales progress from light (50) to dark (900).
export const lightColors: ColorTokens = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // typical "brand" shade
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  neutral: {
    50: '#f8fafc', // near-white background option
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a', // deepest neutral
  },
  // Status colors (kept same across themes for recognition)
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',

  // Page/container backgrounds for light mode
  background: '#ffffff',
  surface: '#f8fafc',

  // Text roles for light mode
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    disabled: '#94a3b8',
  },
};

// --- Dark theme tokens ---
// Note: scales are intentionally "mirrored": 50 is darkest and 900 is lightest.
// This keeps "primary[500]" roughly the same *semantic intensity* across themes.
export const darkColors: ColorTokens = {
  primary: {
    50: '#0c4a6e',
    100: '#075985',
    200: '#0369a1',
    300: '#0284c7',
    400: '#0ea5e9',
    500: '#38bdf8',
    600: '#7dd3fc',
    700: '#bae6fd',
    800: '#e0f2fe',
    900: '#f0f9ff',
  },
  neutral: {
    50: '#0f172a', // base dark background option
    100: '#1e293b',
    200: '#334155',
    300: '#475569',
    400: '#64748b',
    500: '#94a3b8',
    600: '#cbd5e1',
    700: '#e2e8f0',
    800: '#f1f5f9',
    900: '#f8fafc', // lightest neutral
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',

  // Page/container backgrounds for dark mode
  background: '#0f172a',
  surface: '#1e293b',

  // Text roles for dark mode
  text: {
    primary: '#f1f5f9',
    secondary: '#cbd5e1',
    disabled: '#64748b',
  },
};
