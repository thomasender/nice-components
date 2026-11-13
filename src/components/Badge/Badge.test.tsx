import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders text with variant', () => {
    render(<Badge variant="success">Free</Badge>);
    expect(screen.getByText('Free')).toHaveAttribute('data-variant', 'success');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        {(['neutral', 'primary', 'info', 'success', 'warning', 'danger'] as const).map((v) => (
          <Badge key={v} variant={v}>
            {v}
          </Badge>
        ))}
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
