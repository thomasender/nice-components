import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: { children: 'You are offline. Some content may be out of date.' },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Success: Story = { args: { variant: 'success', children: 'Saved.' } };
export const Warning: Story = { args: { variant: 'warning', title: 'Slow connection' } };
export const Danger: Story = { args: { variant: 'danger', title: 'Could not save' } };
export const Dismissible: Story = { args: { onDismiss: () => {} } };
