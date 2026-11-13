import { ProgressBar } from 'react-aria-components';
import { cx } from '../../internal/cx.js';
import './Spinner.styles.css';

export interface SpinnerProps {
  /** Accessible name announced by screen readers. @default 'Loading' */
  label?: string;
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/** An indeterminate loading indicator (`role="progressbar"`). Inherits the text color. */
export function Spinner({ label = 'Loading', size = 'md', className }: SpinnerProps) {
  return (
    <ProgressBar
      isIndeterminate
      aria-label={label}
      data-size={size}
      className={cx('nc-spinner', className)}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </ProgressBar>
  );
}
