import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Alert } from './Alert';

describe('Alert', () => {
  it('uses role=status for info/success and role=alert for warning/danger', () => {
    render(
      <>
        <Alert variant="info">i</Alert>
        <Alert variant="success">s</Alert>
        <Alert variant="warning">w</Alert>
        <Alert variant="danger">d</Alert>
      </>
    );
    expect(screen.getAllByRole('status')).toHaveLength(2);
    expect(screen.getAllByRole('alert')).toHaveLength(2);
  });

  it('dismisses', async () => {
    const onDismiss = vi.fn();
    render(
      <Alert onDismiss={onDismiss} dismissLabel="Schließen">
        Hi
      </Alert>
    );
    await userEvent.setup().click(screen.getByRole('button', { name: 'Schließen' }));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Alert title="Heads up" onDismiss={() => {}}>
          Something
        </Alert>
        <Alert variant="danger">Broken</Alert>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
