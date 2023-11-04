'use client';

import { useContext, useState } from 'react';
import Button, { ButtonVariant } from '@/components/Button';
import ActionArea from '@/components/ActionArea';
import { ModalContext } from '@/components/Contexts';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FinalStep from './FinalStep';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const CurrentInput = (props: { step: number }) => {
    switch (props.step) {
        case 0:
            return <FirstStep />;
        case 1:
            return <SecondStep />;
        case 2:
            return <ThirdStep />;
        case 3:
            return <FinalStep />;
        default:
            return <FirstStep />;
    }
};

const NomineeSelection = () => {
    const [step, setStep] = useState(0);
    const { setIsModalOpen, setNextRouteFromModal } = useContext(ModalContext);
    const router = useRouter();

    const openModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setIsModalOpen(true);
        setNextRouteFromModal('/');
    };

    const isLastStep = step === 3;

    const handleSubmit = () => {};

    const goToPrevStep = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        setStep((prevStep) => {
            if (prevStep !== 0) {
                return prevStep - 1;
            }
            openModal(e);
            return 0;
        });
    };

    const goToNextStep = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        if (isLastStep) {
            handleSubmit();
            router.push('/nomination-submitted');
        }
        setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : 0));
    };

    return (
        <div className='max-w-screen-tablet bg-white'>
            <form>
                <CurrentInput step={step} />
                <ActionArea
                    className={clsx(
                        'justify-around tablet:shadow-none px-6 tablet:px-12',
                        isLastStep
                            ? ' tablet:justify-center tablet:items-center'
                            : 'tablet:justify-between'
                    )}
                >
                    <Button
                        href='#'
                        variant={ButtonVariant.secondary}
                        className={clsx(
                            'w-[104px] h-[50px] border-2',
                            isLastStep && 'tablet:hidden'
                        )}
                        onClick={goToPrevStep}
                    >
                        BACK
                    </Button>
                    <Button
                        href='#'
                        className='w-[223px] h-[50px] border-2'
                        onClick={goToNextStep}
                    >
                        {isLastStep ? 'SUBMIT' : 'NEXT'}
                    </Button>
                </ActionArea>
            </form>
        </div>
    );
};

export default NomineeSelection;
