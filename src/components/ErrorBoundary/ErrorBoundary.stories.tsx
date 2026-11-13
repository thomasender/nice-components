import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorBoundary } from './ErrorBoundary';

function Bomb(): never {
  throw new Error('Kaboom');
}

const meta = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  tags: ['autodocs'],
  args: { children: <Bomb /> },
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFallback: Story = {};
export const Translated: Story = {
  args: {
    title: 'Etwas ist schiefgelaufen',
    message: 'Bitte versuche es erneut.',
    retryLabel: 'Nochmal',
  },
};
export const CustomFallback: Story = {
  args: {
    fallback: ({ error, reset }) => <button onClick={reset}>{error.message} – reset</button>,
  },
};
