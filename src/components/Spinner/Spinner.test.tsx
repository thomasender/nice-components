import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('is an indeterminate progressbar with a label', () => {
    render(<Spinner label="Saving" />);
    const bar = screen.getByRole('progressbar', { name: 'Saving' });
    expect(bar).not.toHaveAttribute('aria-valuenow');
  });

  it('has no axe violations', async () => {
    const { container } = render(<Spinner />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
