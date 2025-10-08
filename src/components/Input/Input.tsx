import React from 'react';
import { useTheme } from '../../styles/themes/ThemeProvider';
import { spacing, type Spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  // Keep your non-standard signature to avoid breaking callers:
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
  margin?: Spacing;
  fullWidth?: boolean;
  /** Optional explicit id; if omitted and label/helperText exist, a stable id will be generated */
  id?: string;
  /** Optional name, useful in forms */
  name?: string;
  /** Mark the field as required for a11y */
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = 'text',
    placeholder,
    value,
    onChange,
    disabled = false,
    error = false,
    helperText,
    label,
    margin = 'md',
    fullWidth = false,
    id,
    name,
    required,
  },
  ref
) {
  const { colors, resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  // Generate stable ids when needed to wire label/helper a11y
  const reactId = React.useId();
  const inputId = id ?? (label ? `input-${reactId}` : undefined);
  const helperId = helperText ? `help-${reactId}` : undefined;

  // Focus-visible ring state (keyboard users)
  const [isFocusVisible, setIsFocusVisible] = React.useState(false);

  // Theme-aware base border; error overrides this
  const baseBorderColor = isLight ? colors.neutral[300] : colors.neutral[600];
  const focusColor = error ? colors.error : colors.primary[500];
  const focusHalo = error ? colors.error : colors.primary[200];

  // Wrapper handles layout width + margin so label/input/helper align nicely
  const wrapperStyle: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    margin: spacing[margin],
  };

  const labelStyle: React.CSSProperties = {
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs,
    display: 'block',
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    padding: `${spacing.sm} ${spacing.md}`,
    border: `1px solid ${error ? colors.error : baseBorderColor}`,
    borderRadius: '0.375rem',
    // In dark mode, use surface for better contrast; in light, background is fine
    backgroundColor: isLight ? colors.background : colors.surface,
    color: colors.text.primary,
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    outline: 'none',
    transition: 'box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
    // Focus ring (only when focus is visibly triggered)
    ...(isFocusVisible
      ? { boxShadow: `0 0 0 3px ${focusHalo}, 0 0 0 5px ${focusColor}`, borderColor: focusColor }
      : {}),
  };

  const helperTextStyle: React.CSSProperties = {
    color: error ? colors.error : colors.text.secondary,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
  };

  // Mobile numeric keyboard hints when type="number"
  const numericHints =
    type === 'number' ? { inputMode: 'numeric' as const, pattern: '[0-9]*' } : {};

  return (
    <div style={wrapperStyle}>
      {label && (
        <label htmlFor={inputId} style={labelStyle} data-testid="input-label">
          {label}
          {required ? ' *' : null}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        // Keep your API: call onChange with just the string value
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        required={required}
        aria-invalid={error || undefined}
        aria-describedby={helperId}
        style={inputStyle}
        onFocus={(e) => setIsFocusVisible(e.currentTarget.matches(':focus-visible'))}
        onBlur={() => setIsFocusVisible(false)}
        data-testid="input"
        {...numericHints}
      />

      {helperText && (
        <p id={helperId} style={helperTextStyle} data-testid="input-helper" role={error ? 'alert' : undefined}>
          {helperText}
        </p>
      )}
    </div>
  );
});
