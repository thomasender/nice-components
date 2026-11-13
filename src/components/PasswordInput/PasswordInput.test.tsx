import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
  it('is hidden by default and toggles visibility', async () => {
    const user = userEvent.setup();
    render(<PasswordInput label="Password" />);
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(input).toHaveAttribute('type', 'text');

    await user.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('supports custom (translated) toggle labels', () => {
    render(<PasswordInput label="Passwort" showLabel="Passwort anzeigen" />);
    expect(screen.getByRole('button', { name: 'Passwort anzeigen' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<PasswordInput label="Password" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
