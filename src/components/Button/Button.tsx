import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';
import './Button.styles.css';

export interface ButtonProps extends Omit<AriaButtonProps, 'className'> {
  /** Visual style. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Size. `sm` is below the 44px touch target; use it only for dense desktop UIs. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * A button. Built on React Aria, so keyboard, focus and screen-reader behavior
 * (including `isPending` → `aria-disabled`) come for free.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      {...props}
      type={type}
      data-variant={variant}
      data-size={size}
      className={['nc-button', className].filter(Boolean).join(' ')}
    />
  );
}
