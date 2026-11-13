import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordInput } from './PasswordInput';

const meta = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  args: { label: 'Password' },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Invalid: Story = { args: { isInvalid: true, errorMessage: 'Too short.' } };
export const German: Story = {
  args: { label: 'Passwort', showLabel: 'Passwort anzeigen', hideLabel: 'Passwort verbergen' },
};
