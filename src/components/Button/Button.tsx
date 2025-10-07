import React from 'react';
import { useTheme } from '../../styles/themes/ThemeProvider';
import {  spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  margin?: Spacing;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    children,
    disabled = false,
    onClick,
    fullWidth = false,
    type = 'button',
    margin = 'md',
    ...rest
  },
  ref
) {
  const { colors } = useTheme();

  // Detect if the current device meaningfully supports hover
  const [canHover, setCanHover] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      const mq = window.matchMedia('(hover: hover)');
      const update = () => setCanHover(mq.matches);
      update();
      mq.addEventListener?.('change', update);
      return () => mq.removeEventListener?.('change', update);
    }
  }, []);

  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocusVisible, setIsFocusVisible] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const baseStyle: React.CSSProperties = {
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
    border: '1px solid transparent',
    borderRadius: '0.375rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'transform 0.05s ease, background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : 'auto',
    margin: spacing[margin],
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    userSelect: 'none',
    textDecoration: 'none',
    outline: 'none',
  };

  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
      fontSize: typography.fontSize.sm,
      padding: `${spacing.xs} ${spacing.sm}`,
    },
    md: {
      fontSize: typography.fontSize.base,
      padding: `${spacing.sm} ${spacing.md}`,
    },
    lg: {
      fontSize: typography.fontSize.lg,
      padding: `${spacing.md} ${spacing.lg}`,
    },
  };

  // NOTE: Use #fff for text on primary to guarantee contrast in both themes.
  // If you can, add a token: colors.textOnPrimary.
  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: colors.primary[500],
      color: '#ffffff',
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: colors.neutral[200],
      color: colors.text.primary,
      borderColor: 'transparent',
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary[500],
      borderColor: colors.primary[500],
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.primary[500],
      borderColor: 'transparent',
    },
  };

  const hoverStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: { backgroundColor: colors.primary[600] },
    secondary: { backgroundColor: colors.neutral[300] },
    outline: { backgroundColor: colors.primary[50] },
    ghost: { backgroundColor: colors.primary[50] },
  };

  const activeStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: { backgroundColor: colors.primary[700] },
    secondary: { backgroundColor: colors.neutral[400] },
    outline: { backgroundColor: colors.primary[100] },
    ghost: { backgroundColor: colors.primary[100] },
  };

  // Accessible focus-visible ring
  const focusRing: React.CSSProperties = isFocusVisible
    ? {
        boxShadow: `0 0 0 3px ${colors.primary[200]}, 0 0 0 5px ${colors.primary[500]}`,
      }
    : {};

  const style: React.CSSProperties = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...(canHover && isHovered && !disabled ? hoverStyles[variant] : {}),
    ...(isActive && !disabled ? activeStyles[variant] : {}),
    ...focusRing,
    transform: isActive ? 'translateY(1px)' : undefined,
  };

  return (
    <button
      ref={ref}
      type={type}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') setIsActive(true);
      }}
      onKeyUp={() => setIsActive(false)}
      onFocus={(e) => setIsFocusVisible(e.currentTarget.matches(':focus-visible'))}
      onBlur={() => setIsFocusVisible(false)}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      data-testid="button"
      {...rest}
    >
      {children}
    </button>
  );
});
