import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { label: 'Name' },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { placeholder: 'Ada Lovelace' } };
export const WithDescription: Story = { args: { description: 'As shown on your profile.' } };
export const Required: Story = { args: { isRequired: true } };
export const Invalid: Story = { args: { isInvalid: true, errorMessage: 'Please enter a name.' } };
export const Disabled: Story = { args: { isDisabled: true, defaultValue: 'Locked' } };
export const Multiline: Story = { args: { label: 'Bio', multiline: true, rows: 4 } };
