import type { ReactNode } from 'react';
import { Button } from 'react-aria-components';
import { cx } from '../../internal/cx.js';
import {
  CheckCircleIcon,
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  WarningIcon,
} from '../../internal/icons.js';
import './Alert.styles.css';

export interface AlertProps {
  /** @default 'info' */
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: ReactNode;
  children?: ReactNode;
  /** Shows a dismiss button that calls this. */
  onDismiss?: () => void;
  /** Accessible name of the dismiss button. @default 'Dismiss' */
  dismissLabel?: string;
  className?: string;
}

const ICONS = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  danger: ErrorIcon,
};

/**
 * An inline message. `warning` and `danger` use `role="alert"` (announced immediately);
 * `info` and `success` use `role="status"` (announced politely).
 */
export function Alert({
  variant = 'info',
  title,
  children,
  onDismiss,
  dismissLabel = 'Dismiss',
  className,
}: AlertProps) {
  const Icon = ICONS[variant];
  const urgent = variant === 'warning' || variant === 'danger';
  return (
    <div
      role={urgent ? 'alert' : 'status'}
      data-variant={variant}
      className={cx('nc-alert', className)}
    >
      <Icon className="nc-alert__icon" />
      <div className="nc-alert__content">
        {title && <p className="nc-alert__title">{title}</p>}
        {children && <div className="nc-alert__body">{children}</div>}
      </div>
      {onDismiss && (
        <Button className="nc-alert__dismiss" aria-label={dismissLabel} onPress={onDismiss}>
          <CloseIcon size={18} />
        </Button>
      )}
    </div>
  );
}
