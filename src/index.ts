import './styles/tokens.css';

export { Alert, type AlertProps } from './components/Alert/index.js';
export { Avatar, getInitials, type AvatarProps } from './components/Avatar/index.js';
export { Badge, type BadgeProps } from './components/Badge/index.js';
export { Button, type ButtonProps } from './components/Button/index.js';
export { Chip, type ChipProps } from './components/Chip/index.js';
export { ConfirmDialog, type ConfirmDialogProps } from './components/ConfirmDialog/index.js';
export {
  ErrorBoundary,
  type ErrorBoundaryFallbackProps,
  type ErrorBoundaryProps,
} from './components/ErrorBoundary/index.js';
export { Modal, type ModalProps } from './components/Modal/index.js';
export { PasswordInput, type PasswordInputProps } from './components/PasswordInput/index.js';
export { Skeleton, type SkeletonProps } from './components/Skeleton/index.js';
export { Spinner, type SpinnerProps } from './components/Spinner/index.js';
export { TextField, type TextFieldProps } from './components/TextField/index.js';

// Re-exported so consumers can open a <Modal> uncontrolled without a direct react-aria-components dependency.
export { DialogTrigger } from 'react-aria-components';
