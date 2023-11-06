'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalContext } from './Contexts';
import Footer from './Footer';
import Header from './Header';
import Modal from './Modal';
import ActionArea from './ActionArea';
import Button, { ButtonVariant } from './Button';

const queryClient = new QueryClient();

const RootComponent = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [nextRouteFromModal, setNextRouteFromModal] = useState<string | null>(
        null
    );

    const closeModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setIsModalOpen(false);
    };
    //cube-academy-api.cubeapis.com/api/nomination

    https: return (
        <ModalContext.Provider
            value={{
                isModalOpen,
                setIsModalOpen,
                nextRouteFromModal,
                setNextRouteFromModal,
            }}
        >
            <QueryClientProvider client={queryClient}>
                <Header />
                <main className='flex grow flex-col items-center'>
                    {children}
                </main>
                <Footer />
                {isModalOpen ? (
                    <Modal>
                        <h2 className='text-lg font-bold leading-[48px] mb-2 px-6'>
                            ARE YOU SURE?
                        </h2>
                        <span className='font-anonymous leading-[30px] mb-12 px-6'>
                            If you leave this page, you will lose any progress
                            made.
                        </span>
                        <ActionArea className='flex-col shadow-[0px_2px_10px_0px_#1A1A193D] px-6'>
                            <Button
                                href='#'
                                variant={ButtonVariant.secondary}
                                className='w-full mb-4 py-2'
                                onClick={(e) => {
                                    closeModal(e);
                                    if (nextRouteFromModal) {
                                        router.push(nextRouteFromModal);
                                    }
                                }}
                            >
                                Yes, Leave Page
                            </Button>
                            <Button
                                href='#'
                                variant={ButtonVariant.secondary}
                                onClick={closeModal}
                                className='w-full py-2'
                            >
                                Cancel
                            </Button>
                        </ActionArea>
                    </Modal>
                ) : null}
            </QueryClientProvider>
        </ModalContext.Provider>
    );
};

export default RootComponent;
