import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { axe } from 'vitest-axe';
import { ErrorBoundary } from './ErrorBoundary';

function Bomb({ explode }: { explode: boolean }) {
  if (explode) throw new Error('boom');
  return <p>all good</p>;
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

describe('ErrorBoundary', () => {
  it('renders children when nothing throws', () => {
    render(
      <ErrorBoundary>
        <Bomb explode={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText('all good')).toBeInTheDocument();
  });

  it('shows the default fallback, reports the error and can retry', async () => {
    const onError = vi.fn();
    function Harness() {
      const [explode, setExplode] = useState(true);
      return (
        <>
          <button onClick={() => setExplode(false)}>fix</button>
          <ErrorBoundary onError={onError}>
            <Bomb explode={explode} />
          </ErrorBoundary>
        </>
      );
    }
    const user = userEvent.setup();
    render(<Harness />);

    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'boom' }),
      expect.anything()
    );

    await user.click(screen.getByRole('button', { name: 'fix' }));
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(screen.getByText('all good')).toBeInTheDocument();
  });

  it('supports a render-function fallback', () => {
    render(
      <ErrorBoundary fallback={({ error }) => <p>custom: {error.message}</p>}>
        <Bomb explode />
      </ErrorBoundary>
    );
    expect(screen.getByText('custom: boom')).toBeInTheDocument();
  });

  it('has no axe violations in the fallback', async () => {
    const { container } = render(
      <ErrorBoundary>
        <Bomb explode />
      </ErrorBoundary>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
