'use client';

import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    useForm,
    SubmitHandler,
    UseFormRegister,
    FieldErrors,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PiSpinner } from 'react-icons/pi';
import clsx from 'clsx';
import Button, { ButtonVariant } from '@/components/Button';
import ActionArea from '@/components/ActionArea';
import { ModalContext } from '@/components/Contexts';
import SelectionStep from './SelectionStep';
import ReasonStep from './ReasonStep';
import ProcessFeedbackStep from './ProcessFeedbackStep';
import OverviewStep from './OverviewStep';
import { FormInputs, formSchema } from './type';

const CurrentStepComponent = (props: {
    step: number;
    register: UseFormRegister<FormInputs>;
    errors: FieldErrors<FormInputs>;
    setStep: Dispatch<SetStateAction<number>>;
    nomineeName: string | null;
}) => {
    const { step, register, errors, setStep } = props;

    switch (step) {
        case 0:
            return (
                <SelectionStep
                    register={register}
                    errMsg={errors.nomineeId?.message ?? null}
                />
            );
        case 1:
            return (
                <ReasonStep
                    register={register}
                    errMsg={errors.reason?.message ?? null}
                    nomineeName={props.nomineeName}
                />
            );
        case 2:
            return (
                <ProcessFeedbackStep
                    register={register}
                    errMsg={errors.process?.message ?? null}
                />
            );
        case 3:
            return <OverviewStep errors={errors} setStep={setStep} />;
        default:
            return (
                <SelectionStep
                    register={register}
                    errMsg={errors.nomineeId?.message ?? null}
                />
            );
    }
};

const NomineeSelection = () => {
    const [step, setStep] = useState(0);
    const [nomineeName, setNomineeName] = useState<string | null>(null);
    const { setIsModalOpen, setNextRouteFromModal } = useContext(ModalContext);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<FormInputs>({ resolver: yupResolver(formSchema) });

    const openModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setIsModalOpen(true);
        setNextRouteFromModal('/');
    };

    const isLastStep = step === 3;

    const submitNomination: SubmitHandler<FormInputs> = (data) => {
        // TODO: Set the nominee name from the fetched data
        setNomineeName('Some Name');
        router.push('/nomination-submitted');
    };

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
            handleSubmit(submitNomination)();
            // router.push('/nomination-submitted');
        } else {
            setStep((prevStep) => prevStep + 1);
        }
    };

    return (
        <div className='max-w-screen-tablet bg-white'>
            <form>
                <CurrentStepComponent
                    step={step}
                    register={register}
                    errors={errors}
                    setStep={setStep}
                    nomineeName={nomineeName}
                />
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
                        isDisabled={
                            isLastStep &&
                            (isSubmitting || Object.keys(errors).length > 0)
                        }
                    >
                        {isLastStep ? (
                            isSubmitting ? (
                                <PiSpinner className='h-6 w-6 text-black' />
                            ) : (
                                'SUBMIT'
                            )
                        ) : (
                            'NEXT'
                        )}
                    </Button>
                </ActionArea>
            </form>
        </div>
    );
};

export default NomineeSelection;
