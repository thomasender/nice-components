import type { ReactNode, Ref } from 'react';
import {
  FieldError,
  Input,
  Label,
  Text,
  TextArea,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from 'react-aria-components';
import { cx } from '../../internal/cx.js';
import './TextField.styles.css';

export interface TextFieldProps extends Omit<AriaTextFieldProps, 'className' | 'children'> {
  /** Visible label. Without one you must pass `aria-label`. */
  label?: ReactNode;
  /** Help text shown below the field and announced with it. */
  description?: ReactNode;
  /** Shown when the field is invalid (`isInvalid`, or native/`validate` errors). */
  errorMessage?: ReactNode | ((validation: ValidationResult) => ReactNode);
  placeholder?: string;
  /** Render a `<textarea>` instead of an `<input>`. */
  multiline?: boolean;
  /** Visible rows of a multiline field. @default 3 */
  rows?: number;
  /** Content rendered inside the field's border, after the input (e.g. an icon button). */
  endContent?: ReactNode;
  /** Ref to the underlying `<input>` / `<textarea>`. */
  inputRef?: Ref<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
}

/** A labelled text input or textarea with description and validation message. */
export function TextField({
  label,
  description,
  errorMessage,
  placeholder,
  multiline = false,
  rows = 3,
  endContent,
  inputRef,
  className,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField {...props} className={cx('nc-field', className)}>
      {label && (
        <Label className="nc-field__label">
          {label}
          {props.isRequired && (
            <span aria-hidden="true" className="nc-field__required">
              {' '}
              *
            </span>
          )}
        </Label>
      )}
      <div className="nc-field__control">
        {multiline ? (
          <TextArea
            ref={inputRef as Ref<HTMLTextAreaElement>}
            rows={rows}
            placeholder={placeholder}
            className="nc-field__input"
          />
        ) : (
          <Input
            ref={inputRef as Ref<HTMLInputElement>}
            placeholder={placeholder}
            className="nc-field__input"
          />
        )}
        {endContent}
      </div>
      {description && (
        <Text slot="description" className="nc-field__description">
          {description}
        </Text>
      )}
      <FieldError className="nc-field__error">{errorMessage}</FieldError>
    </AriaTextField>
  );
}
