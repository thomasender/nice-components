import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { ConfirmDialog } from './ConfirmDialog';

const setup = (props: Partial<React.ComponentProps<typeof ConfirmDialog>> = {}) => {
  const onConfirm = vi.fn();
  const onOpenChange = vi.fn();
  render(
    <ConfirmDialog
      isOpen
      title="Delete event?"
      message="This cannot be undone."
      onConfirm={onConfirm}
      onOpenChange={onOpenChange}
      {...props}
    />
  );
  return { onConfirm, onOpenChange, user: userEvent.setup() };
};

describe('ConfirmDialog', () => {
  it('is an alertdialog with title and message', () => {
    setup();
    expect(screen.getByRole('alertdialog', { name: 'Delete event?' })).toBeInTheDocument();
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
  });

  it('confirms and cancels', async () => {
    const { onConfirm, onOpenChange, user } = setup();
    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(onConfirm).toHaveBeenCalledWith(undefined);

    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('does not close on outside click (alertdialog)', async () => {
    const { onOpenChange, user } = setup();
    await user.click(document.body);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('requires a reason and passes it trimmed', async () => {
    const { onConfirm, user } = setup({ reasonLabel: 'Reason', danger: true });
    const confirm = screen.getByRole('button', { name: 'Confirm' });
    expect(confirm).toBeDisabled();

    await user.type(screen.getByLabelText(/Reason/), '  duplicate  ');
    expect(confirm).toBeEnabled();
    await user.click(confirm);
    expect(onConfirm).toHaveBeenCalledWith('duplicate');
  });

  it('blocks everything while pending', async () => {
    const { onOpenChange, user } = setup({ isPending: true });
    expect(screen.getByRole('button', { name: /Confirm/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    expect(screen.getByRole('progressbar', { name: 'Loading' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it('has no axe violations', async () => {
    setup({ reasonLabel: 'Reason' });
    expect(await axe(screen.getByRole('alertdialog'))).toHaveNoViolations();
  });
});
