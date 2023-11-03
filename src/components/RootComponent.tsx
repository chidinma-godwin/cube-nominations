'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModalContext } from './Contexts';
import Footer from './Footer';
import Header from './Header';
import Modal from './Modal';

const RootComponent = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [nextRouteFromModal, setNextRouteFromModal] = useState<string | null>(
        null
    );

    return (
        <ModalContext.Provider
            value={{
                isModalOpen,
                setIsModalOpen,
                nextRouteFromModal,
                setNextRouteFromModal,
            }}
        >
            <Header />
            <main className='flex grow flex-col items-center max-w-screen-tablet mx-auto bg-white'>
                {children}
            </main>
            <Footer />
            {isModalOpen ? (
                <Modal
                    setIsModalOpen={setIsModalOpen}
                    handleLeavePage={() => {
                        if (nextRouteFromModal) {
                            router.push(nextRouteFromModal);
                        }
                    }}
                />
            ) : null}
        </ModalContext.Provider>
    );
};

export default RootComponent;
