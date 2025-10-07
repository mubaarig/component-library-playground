import React from 'react';
import { useTheme } from '../../styles/themes/ThemeProvider';
import { spacing, type Spacing } from '../../tokens/spacing';

type Elevation = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: Spacing;
  margin?: Spacing;
  elevation?: Elevation;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, padding = 'md', margin = 'md', elevation = 'sm', style: styleProp, ...rest },
  ref
) {
  const { colors, resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  // Use a theme-appropriate border for subtle separation
  const borderColor = isLight ? colors.neutral[200] : colors.neutral[600];

  // Theme-aware shadow recipes
  const lightShadows: Record<Elevation, React.CSSProperties> = {
    none: {},
    sm: { boxShadow: '0 1px 2px rgba(0,0,0,0.06)' },
    md: { boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)' },
    lg: { boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)' },
  };

  // In dark mode: slightly stronger shadow + faint top highlight to lift from dark BG
  const darkShadows: Record<Elevation, React.CSSProperties> = {
    none: {},
    sm: { boxShadow: '0 1px 2px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)' },
    md: { boxShadow: '0 6px 10px -2px rgba(0,0,0,0.45), 0 2px 4px -1px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)' },
    lg: { boxShadow: '0 16px 24px -6px rgba(0,0,0,0.5), 0 6px 12px -2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)' },
  };

  const elevationStyles = (isLight ? lightShadows : darkShadows)[elevation];

  const baseStyle: React.CSSProperties = {
    backgroundColor: colors.surface,
    borderRadius: '0.5rem',
    padding: spacing[padding],
    margin: spacing[margin],
    border: `1px solid ${borderColor}`,
  };

  const style: React.CSSProperties = { ...baseStyle, ...elevationStyles, ...styleProp };

  return (
    <div ref={ref} style={style} data-testid="card" {...rest}>
      {children}
    </div>
  );
});
