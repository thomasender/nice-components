import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const photo =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#a5b4fc"/><circle cx="140" cy="70" r="30" fill="#4338ca"/></svg>'
  );

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Ada Lovelace' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};
export const Image: Story = { args: { src: photo } };
export const FocalPointAndZoom: Story = {
  args: { src: photo, size: 'xl', focalPoint: { x: 0.7, y: 0.35 }, zoom: 2 },
};
export const BrokenImage: Story = { args: { src: '/does-not-exist.jpg' } };
