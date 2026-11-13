import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  // Served from https://thomasender.github.io/nice-components/ in CI.
  viteFinal: (config) => ({ ...config, base: process.env.STORYBOOK_BASE ?? '/' }),
};

export default config;
