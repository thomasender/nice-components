import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Button } from './Button';

describe('Button', () => {
  it('fires onPress on click and keyboard', async () => {
    const onPress = vi.fn();
    const user = userEvent.setup();
    render(<Button onPress={onPress}>Save</Button>);

    await user.click(screen.getByRole('button', { name: 'Save' }));
    await user.keyboard('{Enter}');

    expect(onPress).toHaveBeenCalledTimes(2);
  });

  it('defaults to type="button" so it never submits a form by accident', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('does not fire when disabled', async () => {
    const onPress = vi.fn();
    render(
      <Button isDisabled onPress={onPress}>
        Save
      </Button>
    );
    await userEvent.setup().click(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('merges a custom className', () => {
    render(<Button className="custom">Save</Button>);
    expect(screen.getByRole('button')).toHaveClass('nc-button', 'custom');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger" isDisabled>
          Danger
        </Button>
        <Button aria-label="Close">×</Button>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
