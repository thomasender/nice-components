import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/styles/tokens.css';

const withTheme: Decorator = (Story, context) => {
  document.documentElement.dataset.theme = context.globals.theme;
  return <Story />;
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
};

export default preview;
