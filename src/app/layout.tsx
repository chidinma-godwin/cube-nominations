import type { Metadata } from 'next';
import { Poppins, Anonymous_Pro } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '600', '700'],
    variable: '--font-poppins',
});

const anonymousPro = Anonymous_Pro({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-anonymous-pro',
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
                <Header />
                <main className='flex grow'>{children}</main>
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
