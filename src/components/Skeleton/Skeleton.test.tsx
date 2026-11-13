import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('is hidden from assistive tech and sized', () => {
    const { container } = render(<Skeleton width={120} height={16} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el.style.inlineSize).toBe('120px');
    expect(el.style.blockSize).toBe('16px');
  });

  it('circle uses height as width by default', () => {
    const { container } = render(<Skeleton circle height={40} />);
    expect((container.firstElementChild as HTMLElement).style.inlineSize).toBe('40px');
  });

  it('has no axe violations', async () => {
    const { container } = render(<Skeleton />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
