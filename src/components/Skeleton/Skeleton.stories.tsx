import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = { args: { width: 240, height: 16 } };
export const Circle: Story = { args: { circle: true, height: 48 } };
export const CardPlaceholder: Story = {
  render: () => (
    <div aria-busy="true" style={{ display: 'flex', gap: 12, alignItems: 'center', width: 280 }}>
      <Skeleton circle height={48} />
      <div style={{ flex: 1, display: 'grid', gap: 8 }}>
        <Skeleton height={14} />
        <Skeleton height={14} width="60%" />
      </div>
    </div>
  ),
};
