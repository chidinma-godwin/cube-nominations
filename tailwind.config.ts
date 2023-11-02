import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                green: '#A0FF1F',
                pink: '#F70087',
                black: '#000000',
                white: '#FFFFFF',
                gray: {
                    dark: '#5B5B5B',
                    DEFAULT: '#C3C3C3',
                    light: '#F8F8F8',
                },
                success: '#00ED71',
                error: '#F40256',
            },
        },
    },
    plugins: [],
};
export default config;
