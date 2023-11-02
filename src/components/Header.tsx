import Image from 'next/image';
import Link from 'next/link';
import { FaInbox } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';

const Header = () => {
    return (
        <header className='bg-black tablet:mb-12'>
            <nav
                className='flex items-center justify-between p-4'
                aria-label='Nominations'
            >
                <Link href='/' className='-m-1.5 p-1.5'>
                    <Image
                        className='hidden tablet:flex'
                        width={200}
                        height={100}
                        src='/desktop-logo.svg'
                        alt=''
                    />
                    <Image
                        className='tablet:hidden'
                        width={40}
                        height={40}
                        src='/mobile-logo.svg'
                        alt=''
                    />
                </Link>
                <Link href='#' className='leading-[30px] text-white'>
                    <span className='hidden tablet:flex tablet:flex-1 tablet:justify-end font-anonymous'>
                        Your Nominations (0)
                    </span>
                    <div className='tablet:hidden flex'>
                        <HiPlus className='h-6 w-6 text-white mr-2' />
                        <FaInbox className='h-6 w-6 text-white' />
                    </div>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
