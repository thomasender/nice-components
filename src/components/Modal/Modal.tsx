import type { ReactNode } from 'react';
import {
  Button,
  Dialog,
  Heading,
  Modal as AriaModal,
  ModalOverlay,
  type DialogProps,
} from 'react-aria-components';
import { CloseIcon } from '../../internal/icons.js';
import { cx } from '../../internal/cx.js';
import './Modal.styles.css';

export interface ModalProps {
  /** Controlled open state. Omit when the modal is rendered inside a `DialogTrigger`. */
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  /** Heading; also the dialog's accessible name. Without one you must pass `aria-label`. */
  title?: ReactNode;
  'aria-label'?: string;
  children: ReactNode | ((opts: { close: () => void }) => ReactNode);
  /** `alertdialog` for urgent confirmations that must be answered. @default 'dialog' */
  role?: DialogProps['role'];
  /** Close on click outside. @default true (false for `alertdialog`) */
  isDismissable?: boolean;
  /** Disable closing with Escape. */
  isKeyboardDismissDisabled?: boolean;
  /** Show the “×” button. @default true (false for `alertdialog`) */
  showCloseButton?: boolean;
  /** Accessible name of the “×” button. @default 'Close' */
  closeLabel?: string;
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * A modal dialog. Focus is trapped and restored, Escape and outside click close it, the page behind
 * is inert and scroll-locked — all handled by React Aria.
 */
export function Modal({
  isOpen,
  onOpenChange,
  title,
  'aria-label': ariaLabel,
  children,
  role = 'dialog',
  isDismissable,
  isKeyboardDismissDisabled,
  showCloseButton,
  closeLabel = 'Close',
  size = 'md',
  className,
}: ModalProps) {
  const isAlert = role === 'alertdialog';
  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable ?? !isAlert}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      className="nc-modal-overlay"
    >
      <AriaModal className={cx('nc-modal', className)} data-size={size}>
        <Dialog role={role} aria-label={ariaLabel} className="nc-dialog">
          {({ close }) => (
            <>
              {(showCloseButton ?? !isAlert) && (
                <Button slot="close" aria-label={closeLabel} className="nc-dialog__close">
                  <CloseIcon />
                </Button>
              )}
              {title && (
                <Heading slot="title" className="nc-dialog__title">
                  {title}
                </Heading>
              )}
              {typeof children === 'function' ? children({ close }) : children}
            </>
          )}
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  );
}
