import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders nothing while closed', () => {
    render(
      <Modal isOpen={false} title="Hello">
        Body
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('is a dialog named by its title', () => {
    render(
      <Modal isOpen title="Hello">
        Body
      </Modal>
    );
    expect(screen.getByRole('dialog', { name: 'Hello' })).toBeInTheDocument();
  });

  it('closes via the close button and Escape', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal isOpen onOpenChange={onOpenChange} title="Hello">
        Body
      </Modal>
    );
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);

    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledTimes(2);
  });

  it('can use a translated close label', () => {
    render(
      <Modal isOpen title="Hallo" closeLabel="Schließen">
        Inhalt
      </Modal>
    );
    expect(screen.getByRole('button', { name: 'Schließen' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    render(
      <Modal isOpen title="Hello">
        Body
      </Modal>
    );
    expect(await axe(screen.getByRole('dialog'))).toHaveNoViolations();
  });
});
