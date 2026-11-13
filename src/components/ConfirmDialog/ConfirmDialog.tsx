import { useState, type ReactNode } from 'react';
import { Button } from '../Button/Button.js';
import { Modal } from '../Modal/Modal.js';
import { Spinner } from '../Spinner/Spinner.js';
import { TextField } from '../TextField/TextField.js';
import './ConfirmDialog.styles.css';

export interface ConfirmDialogProps {
  isOpen: boolean;
  /** Called with `false` when the user cancels, presses Escape, or closes the dialog. */
  onOpenChange: (isOpen: boolean) => void;
  /** Called when the user confirms. With `reasonLabel` it receives the trimmed reason. */
  onConfirm: (reason?: string) => void;
  title: ReactNode;
  /** Body text. Use `children` for richer content. */
  message?: ReactNode;
  children?: ReactNode;
  /** @default 'Confirm' */
  confirmLabel?: string;
  /** @default 'Cancel' */
  cancelLabel?: string;
  /** Use the destructive style for the confirm button. */
  danger?: boolean;
  /** Disables both buttons and blocks dismissing while a request is running. */
  isPending?: boolean;
  /** Extra condition that keeps the confirm button disabled. */
  isConfirmDisabled?: boolean;
  /** Adds a required textarea with this label; confirm stays disabled until it has text. */
  reasonLabel?: string;
  /** Accessible name of the spinner shown while pending. @default 'Loading' */
  pendingLabel?: string;
}

/** Asks the user to confirm an action. Renders as an `alertdialog`. */
export function ConfirmDialog({ isOpen, onOpenChange, title, ...rest }: ConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!rest.isPending) onOpenChange(open);
      }}
      title={title}
      role="alertdialog"
      size="sm"
    >
      {({ close }) => <ConfirmBody {...rest} onCancel={close} />}
    </Modal>
  );
}

// Mounted only while the modal is open, so the reason resets every time it opens.
function ConfirmBody({
  message,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  isPending = false,
  isConfirmDisabled = false,
  reasonLabel,
  pendingLabel = 'Loading',
  onConfirm,
  onCancel,
}: Omit<ConfirmDialogProps, 'isOpen' | 'onOpenChange' | 'title'> & { onCancel: () => void }) {
  const [reason, setReason] = useState('');
  const trimmed = reason.trim();
  const disabled = isPending || isConfirmDisabled || (!!reasonLabel && trimmed.length === 0);

  return (
    <>
      {(children ?? message) && <div className="nc-confirm__body">{children ?? message}</div>}
      {reasonLabel && (
        <TextField
          className="nc-confirm__reason"
          label={reasonLabel}
          isRequired
          multiline
          value={reason}
          onChange={setReason}
          isDisabled={isPending}
        />
      )}
      <div className="nc-confirm__actions">
        <Button variant="secondary" onPress={onCancel} isDisabled={isPending}>
          {cancelLabel}
        </Button>
        <Button
          variant={danger ? 'danger' : 'primary'}
          isDisabled={disabled}
          onPress={() => onConfirm(reasonLabel ? trimmed : undefined)}
        >
          {isPending && <Spinner size="sm" label={pendingLabel} />}
          {confirmLabel}
        </Button>
      </div>
    </>
  );
}
