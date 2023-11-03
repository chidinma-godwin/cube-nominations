import { Dispatch, SetStateAction } from 'react';
import ActionArea from './ActionArea';
import Button, { ButtonVariant } from './Button';

type ModalProps = {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    handleLeavePage: () => void;
};

const Modal = (props: ModalProps) => {
    const closeModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        props.setIsModalOpen(false);
    };

    return (
        <div
            id='modal'
            className='fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto h-[calc(100%-144px)] tablet:h-full w-full'
        >
            <div className='relative w-full h-full shadow bg-black/60'>
                <div className='tablet:p-6 text-center'>
                    <div className='bg-white w-full mx-auto absolute inset-0 inline-flex flex-col mt-80 tablet:mt-60 text-left pt-6 tablet:w-1/2 laptop:w-2/5 tablet:relative'>
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
                                    props.handleLeavePage();
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
