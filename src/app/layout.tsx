import type { Metadata } from 'next';
import { Poppins, Anonymous_Pro } from 'next/font/google';
import './globals.css';
import RootComponent from '@/components/RootComponent';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '600', '700'],
    variable: '--font-poppins',
});

const anonymousPro = Anonymous_Pro({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-anonymous-pro',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Cube Nomination',
    description: 'A cube of the month nomination App',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html
            lang='en'
            className={`${poppins.variable} ${anonymousPro.variable}`}
        >
            <body className={poppins.className}>
                <RootComponent>{children}</RootComponent>
            </body>
        </html>
    );
};

export default RootLayout;
