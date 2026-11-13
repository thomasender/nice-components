import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Chip } from './Chip';

describe('Chip', () => {
  it('toggles and exposes aria-pressed', async () => {
    const onChange = vi.fn();
    render(<Chip onChange={onChange}>Free</Chip>);
    const chip = screen.getByRole('button', { name: 'Free' });
    expect(chip).toHaveAttribute('aria-pressed', 'false');

    await userEvent.setup().click(chip);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(chip).toHaveAttribute('aria-pressed', 'true');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Chip>One</Chip>
        <Chip defaultSelected>Two</Chip>
        <Chip isDisabled>Three</Chip>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
