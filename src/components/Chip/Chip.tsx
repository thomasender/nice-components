import { ToggleButton, type ToggleButtonProps } from 'react-aria-components';
import { cx } from '../../internal/cx.js';
import './Chip.styles.css';

export interface ChipProps extends Omit<ToggleButtonProps, 'className'> {
  className?: string;
}

/**
 * A toggleable filter chip (`aria-pressed`). For a static label use `Badge` instead.
 * Use `isSelected` + `onChange` (controlled) or `defaultSelected`.
 */
export function Chip({ className, ...props }: ChipProps) {
  return <ToggleButton {...props} className={cx('nc-chip', className)} />;
}
