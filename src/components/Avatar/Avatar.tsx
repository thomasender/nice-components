import { useState, type CSSProperties } from 'react';
import { cx } from '../../internal/cx.js';
import './Avatar.styles.css';

export interface AvatarProps {
  src?: string;
  /** Accessible name. Defaults to `name`. Pass `""` for a purely decorative avatar. */
  alt?: string;
  /** Person's name; used for the initials fallback and as the default `alt`. */
  name?: string;
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Point of the image (0–1 each) that stays visible when cropped, e.g. a face. */
  focalPoint?: { x: number; y: number };
  /** Zoom (1–3) around the focal point. @default 1 */
  zoom?: number;
  className?: string;
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));

export function getInitials(name = ''): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  const first = Array.from(words[0] ?? '')[0] ?? '';
  const last = words.length > 1 ? (Array.from(words[words.length - 1] ?? '')[0] ?? '') : '';
  return (first + last).toLocaleUpperCase();
}

/** A round profile picture that falls back to initials when there is no image or it fails to load. */
export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  focalPoint,
  zoom = 1,
  className,
}: AvatarProps) {
  // Remember which `src` failed, so a new `src` is tried again without an effect.
  const [failedSrc, setFailedSrc] = useState<string>();
  const label = alt ?? name;
  const showImage = !!src && failedSrc !== src;

  const fx = clamp(focalPoint?.x ?? 0.5, 0, 1) * 100;
  const fy = clamp(focalPoint?.y ?? 0.5, 0, 1) * 100;
  const z = clamp(zoom, 1, 3);
  const imageStyle: CSSProperties | undefined =
    focalPoint || z > 1
      ? {
          objectPosition: `${fx}% ${fy}%`,
          ...(z > 1 ? { transform: `scale(${z})`, transformOrigin: `${fx}% ${fy}%` } : null),
        }
      : undefined;

  return (
    <span data-size={size} className={cx('nc-avatar', className)}>
      {showImage ? (
        <img
          src={src}
          alt={label ?? ''}
          loading="lazy"
          decoding="async"
          className="nc-avatar__image"
          style={imageStyle}
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span
          className="nc-avatar__fallback"
          {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
        >
          <span aria-hidden="true">{getInitials(name)}</span>
        </span>
      )}
    </span>
  );
}
