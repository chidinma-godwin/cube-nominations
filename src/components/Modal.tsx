import { ReactNode } from 'react';

type ModalProps = {
    children: ReactNode;
};

const Modal = (props: ModalProps) => {
    return (
        <div
            id='modal'
            className='fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-auto h-[calc(100%-144px)] tablet:h-full w-full'
        >
            <div className='relative w-full h-full shadow bg-black/60'>
                <div className='tablet:p-6 text-center'>
                    <div className='bg-white w-full mx-auto absolute inset-0 inline-flex flex-col mt-80 tablet:mt-60 text-left pt-6 tablet:w-1/2 laptop:w-2/5 tablet:relative'>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
