import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Cube Nomination',
    description: 'A cube of the month nomination App',
};

const RootLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <html lang='en'>
            <body className={inter.className}>{children}</body>
        </html>
    );
}

export default RootLayout
