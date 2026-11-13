import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Avatar, getInitials } from './Avatar';

describe('getInitials', () => {
  it.each([
    ['Ada Lovelace', 'AL'],
    ['ada', 'A'],
    ['  Jean  Luc  Picard ', 'JP'],
    ['', ''],
  ])('%j → %j', (input, expected) => {
    expect(getInitials(input)).toBe(expected);
  });
});

describe('Avatar', () => {
  it('shows the image with name as alt', () => {
    render(<Avatar src="/a.jpg" name="Ada Lovelace" />);
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveAttribute('src', '/a.jpg');
  });

  it('falls back to initials without src', () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL');
  });

  it('falls back to initials when the image fails, and retries on a new src', () => {
    const { rerender } = render(<Avatar src="/broken.jpg" name="Ada Lovelace" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByRole('img').tagName).toBe('SPAN');

    rerender(<Avatar src="/ok.jpg" name="Ada Lovelace" />);
    expect(screen.getByRole('img').tagName).toBe('IMG');
  });

  it('is hidden from assistive tech when decorative', () => {
    const { container } = render(<Avatar src="/a.jpg" alt="" />);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('applies focal point and zoom', () => {
    render(<Avatar src="/a.jpg" name="A" focalPoint={{ x: 0.25, y: 0.75 }} zoom={2} />);
    const img = screen.getByRole('img');
    expect(img).toHaveStyle({ objectPosition: '25% 75%', transform: 'scale(2)' });
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Avatar src="/a.jpg" name="Ada" />
        <Avatar name="Ada Lovelace" />
        <Avatar alt="" />
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
