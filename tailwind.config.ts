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
            screens: {
                mobile: '360px',
                tablet: '601px',
                laptop: '1024px',
                desktop: '1280px',
            },
            fontFamily: {
                poppins: ['var(--font-poppins)'],
                anonymous: ['var(--font-anonymous-pro)'],
            },
            fontSize: {
                xs: ['12px', '18px'],
            },
        },
    },
    plugins: [],
};
export default config;
