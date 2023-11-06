'use client';

import { useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaInbox, FaUserCircle } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';
import useToken from '@/hooks/useToken';
import { useGetAllNominations } from '@/data/nominationComponents';
import { ModalContext } from './Contexts';

const Header = () => {
    const { setIsModalOpen, setNextRouteFromModal } = useContext(ModalContext);
    const { authToken, setAuthToken } = useToken();

    const router = useRouter();
    const pathname = usePathname();

    const { data } = useGetAllNominations({});

    const handleShowNominations = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        if (pathname === '/nominee-selection') {
            setIsModalOpen(true);
            setNextRouteFromModal('/view-nominations');
        } else {
            router.push('/view-nominations');
        }
    };

    return (
        <>
            <header className='bg-black tablet:mb-12'>
                <nav
                    className='flex items-center justify-between p-4'
                    aria-label='Nominations'
                >
                    <Link href='/' className='-m-1.5 p-1.5'>
                        <Image
                            className='hidden tablet:flex'
                            width={238.19}
                            height={37}
                            src='/desktop-logo.svg'
                            alt=''
                        />
                        <Image
                            className='tablet:hidden'
                            width={40}
                            height={37}
                            src='/mobile-logo.svg'
                            alt=''
                        />
                    </Link>
                    <div className='flex'>
                        {authToken ? (
                            <button
                                type='button'
                                className='leading-[30px] text-white font-anonymous mr-6'
                                onClick={() => {
                                    setAuthToken(null);
                                    if (pathname != '/') {
                                        router.push('/');
                                    }
                                }}
                            >
                                LOG OUT
                            </button>
                        ) : (
                            <Link href='/login'>
                                <FaUserCircle className='h-6 w-6 text-white mr-6' />
                            </Link>
                        )}
                        <button
                            type='button'
                            className='leading-[30px] text-white'
                            onClick={handleShowNominations}
                        >
                            <span className='hidden tablet:flex tablet:flex-1 tablet:justify-end font-anonymous'>
                                {`Your Nominations (${
                                    data?.data?.length ?? 0
                                })`}
                            </span>
                            <span className='tablet:hidden flex'>
                                <HiPlus className='h-6 w-6 text-white mr-2' />
                                <FaInbox className='h-6 w-6 text-white' />
                            </span>
                        </button>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
