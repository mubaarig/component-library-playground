import React from 'react';
import { useTheme, type Theme } from './../../styles/themes/ThemeProvider';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes: { value: Theme; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ];

  return (
    <Card padding="md" elevation="sm">
      <h3 style={{ margin: '0 0 1rem 0' }}>Theme Selector</h3>
      <p style={{ margin: '0 0 1rem 0', opacity: 0.7 }}>
        Current theme: {theme} ({resolvedTheme})
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {themes.map((themeOption) => (
          <Button
            key={themeOption.value}
            variant={theme === themeOption.value ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTheme(themeOption.value)}
          >
            {themeOption.label}
          </Button>
        ))}
      </div>
    </Card>
  );
};