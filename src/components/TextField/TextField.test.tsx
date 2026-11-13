import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { TextField } from './TextField';

describe('TextField', () => {
  it('labels the input and wires description + error', () => {
    render(
      <TextField label="Email" description="We never share it" isInvalid errorMessage="Invalid" />
    );
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAccessibleDescription(/We never share it/);
    expect(input).toHaveAccessibleDescription(/Invalid/);
    expect(input).toBeInvalid();
  });

  it('calls onChange while typing', async () => {
    const onChange = vi.fn();
    render(<TextField label="Name" onChange={onChange} />);
    await userEvent.setup().type(screen.getByLabelText('Name'), 'Ada');
    expect(onChange).toHaveBeenLastCalledWith('Ada');
  });

  it('renders a textarea when multiline', () => {
    render(<TextField label="Bio" multiline rows={5} />);
    const el = screen.getByLabelText('Bio');
    expect(el.tagName).toBe('TEXTAREA');
    expect(el).toHaveAttribute('rows', '5');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <TextField label="Name" isRequired />
        <TextField label="Bio" multiline description="Short" />
        <TextField label="Email" isInvalid errorMessage="Bad" />
        <TextField label="Locked" isDisabled />
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
