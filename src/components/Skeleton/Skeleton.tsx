import type { CSSProperties } from 'react';
import { cx } from '../../internal/cx.js';
import './Skeleton.styles.css';

export interface SkeletonProps {
  width?: CSSProperties['inlineSize'];
  height?: CSSProperties['blockSize'];
  /** Round shape, for avatars. */
  circle?: boolean;
  className?: string;
}

/**
 * A placeholder shown while content loads. Hidden from screen readers — set `aria-busy="true"` on
 * the loading region (or render a `Spinner`) so assistive tech knows something is loading.
 */
export function Skeleton({ width, height = '1em', circle = false, className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      data-circle={circle || undefined}
      className={cx('nc-skeleton', className)}
      style={{ inlineSize: width ?? (circle ? height : '100%'), blockSize: height }}
    />
  );
}
