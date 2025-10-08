import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {useTheme} from './../../styles/themes/ThemeProvider';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { Button } from '../Button/Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  /** Optional custom id for the title, otherwise auto-generated */
  titleId?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** Close when clicking overlay */
  closeOnOverlay?: boolean;
  /** Close on Escape key */
  closeOnEsc?: boolean;
  /** Trap focus within the dialog */
  trapFocus?: boolean;
  /** Where to portal into (defaults to #modal-root or document.body) */
  container?: HTMLElement | null;
  /** Element to receive initial focus when opening */
  initialFocusRef?: React.RefObject<HTMLElement>;
}

type SizeKey = NonNullable<ModalProps['size']>;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  titleId,
  children,
  actions,
  size = 'md',
  closeOnOverlay = true,
  closeOnEsc = true,
  trapFocus = true,
  container,
  initialFocusRef,
}) => {
  const { colors } = useTheme();
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const autoId = useId();
  const headingId = title ? (titleId ?? `modal-title-${autoId}`) : undefined;

  useEffect(() => setMounted(true), []);

  // lock scroll + focus management
  useEffect(() => {
    if (!isOpen) return;

    lastFocusedRef.current = (document.activeElement as HTMLElement) ?? null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // initial focus
    const focusTarget =
      initialFocusRef?.current ||
      dialogRef.current?.querySelector<HTMLElement>(
        '[data-autofocus], button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) ||
      dialogRef.current;

    focusTarget?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      // restore focus
      lastFocusedRef.current?.focus?.();
    };
  }, [isOpen, initialFocusRef]);

  // ESC + focus trap
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === 'Tab' && trapFocus && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter(el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');

        if (focusables.length === 0) {
          e.preventDefault();
          (dialogRef.current as HTMLElement).focus();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (active === first || !dialogRef.current.contains(active)) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (active === last || !dialogRef.current.contains(active)) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [isOpen, closeOnEsc, trapFocus, onClose]);

  const sizeStyles: Record<SizeKey, React.CSSProperties> = {
    sm: { width: '400px' },
    md: { width: '500px' },
    lg: { width: '600px' },
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: colors.surface,
    borderRadius: '0.5rem',
    padding: spacing.lg,
    ...sizeStyles[size],
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    outline: 'none',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    margin: 0,
  };

  const portalTarget =
    typeof document !== 'undefined'
      ? container || document.getElementById('modal-root') || document.body
      : null;

  if (!isOpen || !mounted || !portalTarget) return null;

  const onOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget && closeOnOverlay) onClose();
  };

  return createPortal(
    <div
      ref={overlayRef}
      style={overlayStyle}
      onClick={onOverlayClick}
      data-testid="modal-overlay"
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        style={modalStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        data-testid="modal"
      >
        {(title || onClose) && ((
          <div style={headerStyle}>
            {title && (
              <h2 id={headingId} style={titleStyle}>
                {title}
              </h2>
            )}
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close dialog">
              ×
            </Button>
          </div>
        ))}
        <div>{children}</div>
        {actions && (
          <div
            style={{
              marginTop: spacing.lg,
              display: 'flex',
              gap: spacing.sm,
              justifyContent: 'flex-end',
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </div>,
    portalTarget
  );
};
