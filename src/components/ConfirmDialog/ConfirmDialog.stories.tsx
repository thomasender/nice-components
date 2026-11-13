import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { ConfirmDialog, type ConfirmDialogProps } from './ConfirmDialog';

const meta = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  args: {
    isOpen: false,
    onOpenChange: () => {},
    onConfirm: () => {},
    title: 'Delete event?',
    message: 'This cannot be undone.',
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo(props: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Open</Button>
      <ConfirmDialog
        {...props}
        isOpen={open}
        onOpenChange={setOpen}
        onConfirm={() => setOpen(false)}
      />
    </>
  );
}

export const Default: Story = { render: (args) => <Demo {...args} /> };
export const Danger: Story = {
  render: (args) => <Demo {...args} danger confirmLabel="Delete" />,
};
export const WithReason: Story = {
  render: (args) => <Demo {...args} danger confirmLabel="Delete" reasonLabel="Reason" />,
};
export const Pending: Story = {
  render: (args) => <Demo {...args} isPending confirmLabel="Delete" />,
};
