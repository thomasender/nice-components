import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogTrigger } from 'react-aria-components';
import { Button } from '../Button/Button';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: { children: null },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTrigger: Story = {
  render: (args) => (
    <DialogTrigger>
      <Button>Open modal</Button>
      <Modal {...args} title="Welcome">
        <p>Focus is trapped here. Press Escape or click outside to close.</p>
      </Modal>
    </DialogTrigger>
  ),
};

export const Small: Story = {
  render: () => (
    <DialogTrigger>
      <Button variant="secondary">Small modal</Button>
      <Modal size="sm" title="Small">
        {({ close }) => <Button onPress={close}>Done</Button>}
      </Modal>
    </DialogTrigger>
  ),
};
