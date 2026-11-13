import type { HTMLAttributes } from 'react';
import { cx } from '../../internal/cx.js';
import './Badge.styles.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** @default 'neutral' */
  variant?: 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
  /** @default 'md' */
  size?: 'sm' | 'md';
}

/**
 * A small static label (status, count, category). Color alone must not carry meaning —
 * keep a text label inside.
 */
export function Badge({ variant = 'neutral', size = 'md', className, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      data-variant={variant}
      data-size={size}
      className={cx('nc-badge', className)}
    />
  );
}
