export default {
    stories: [
        '../src/**/*.mdx',
        '../src/stories/*.stories.@(js|jsx|mjs|ts|tsx)',
        '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
        '../src/layouts/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-mdx-gfm',
        '@chromatic-com/storybook',
    ],

    framework: {
        name: '@storybook/react-vite',
        options: {},
    },

    docs: {},

    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
};
