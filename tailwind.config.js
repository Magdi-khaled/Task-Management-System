// tailwind.config.js
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                green: {
                    500: 'var(--colors-green-500)',
                    400: 'var(--colors-green-400)',
                    300: 'var(--colors-green-300)',
                    200: 'var(--colors-green-200)',
                    100: 'var(--colors-green-100)',
                    50: 'var(--colors-green-50)',
                },
                black: {
                    100: 'var(--colors-black-100)',
                },
            },
        },
    },
    plugins: []
};
