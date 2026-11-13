import { useState } from 'react';
import { Button } from 'react-aria-components';
import { EyeIcon, EyeOffIcon } from '../../internal/icons.js';
import { TextField, type TextFieldProps } from '../TextField/TextField.js';
import './PasswordInput.styles.css';

export interface PasswordInputProps extends Omit<
  TextFieldProps,
  'type' | 'multiline' | 'rows' | 'endContent'
> {
  /** Accessible name of the toggle while the password is hidden. @default 'Show password' */
  showLabel?: string;
  /** Accessible name of the toggle while the password is visible. @default 'Hide password' */
  hideLabel?: string;
}

/** A password field with a show/hide toggle inside the border. */
export function PasswordInput({
  showLabel = 'Show password',
  hideLabel = 'Hide password',
  autoComplete = 'current-password',
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const label = visible ? hideLabel : showLabel;

  return (
    <TextField
      {...props}
      autoComplete={autoComplete}
      type={visible ? 'text' : 'password'}
      endContent={
        <Button
          className="nc-password-toggle"
          aria-label={label}
          isDisabled={props.isDisabled}
          onPress={() => setVisible((v) => !v)}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      }
    />
  );
}
