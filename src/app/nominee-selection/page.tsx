'use client';

import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PiSpinner } from 'react-icons/pi';
import clsx from 'clsx';
import Button, { ButtonVariant } from '@/components/Button';
import ActionArea from '@/components/ActionArea';
import { ModalContext } from '@/components/Contexts';
import { FormInputs, formSchema } from './type';
import CurrentStep from './CurrentStep';
import {
    useCreateNomination,
    useGetNominationById,
    useUpdateNomination,
} from '@/data/nominationComponents';
import { getProcessFromString, getProcessString } from './utils';
import useToken from '@/hooks/useToken';

const NomineeSelection = () => {
    const [step, setStep] = useState(0);
    const { setIsModalOpen, setNextRouteFromModal } = useContext(ModalContext);
    const { authToken } = useToken();
    const router = useRouter();
    const searchParams = useSearchParams();

    const { data: nominationData } = useGetNominationById({
        pathParams: {
            nominationId: searchParams.get('id') ?? '',
        },
    });

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        getValues,
        setError,
        setValue,
        reset,
    } = useForm<FormInputs>({ resolver: yupResolver(formSchema) });

    const { nominee_id, process, reason } = nominationData?.data ?? {};

    const { mutateAsync: createNominationAsync } = useCreateNomination();
    const { mutateAsync: updataNominationAsync } = useUpdateNomination();

    useLayoutEffect(() => {
        if (!authToken) {
            router.push('/account/login');
        }
    }, [authToken, router]);

    const searchId = searchParams.get('id');
    useEffect(() => {
        if (searchId && nominee_id && process && reason) {
            const processValue: FormInputs['process'] =
                getProcessFromString(process);
            setValue('nomineeId', nominee_id);
            setValue('process', processValue);
            setValue('reason', reason);
        }
    }, [nominee_id, process, reason, setValue, searchId]);

    const openModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setIsModalOpen(true);
        setNextRouteFromModal('/');
    };

    const submitNomination: SubmitHandler<FormInputs> = async (data) => {
        const processString = getProcessString(Number(data.process));
        try {
            const nominationId = searchParams.get('id');
            if (nominationId) {
                await updataNominationAsync({
                    pathParams: {
                        nominationId,
                    },
                    body: {
                        nominee_id: data.nomineeId,
                        reason: data.reason,
                        process: processString,
                    },
                });
            } else {
                await createNominationAsync({
                    body: {
                        nominee_id: data.nomineeId,
                        reason: data.reason,
                        process: processString,
                    },
                });
            }

            setStep(4);
        } catch (error: any) {
            setError('root.createNominationErr', {
                message: error.message,
            });
        }
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

    const isSubmissionStep = step === 3;

    const goToNextStep = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        if (isSubmissionStep) {
            handleSubmit(submitNomination)();
        } else {
            setStep((prevStep) => prevStep + 1);
        }
    };

    const allErrors = Object.entries(errors).reduce(
        (acc, [key, value]) => ({
            ...acc,
            ...(key === 'root' ? { ...value } : { [key]: value }),
        }),
        {}
    );

    return (
        <div className='max-w-screen-tablet bg-white'>
            <form>
                <CurrentStep
                    step={step}
                    register={register}
                    errors={allErrors}
                    setStep={setStep}
                    formData={getValues()}
                    reset={reset}
                />
                {/* Don't show this buttons for the submission submitted */}
                {step !== 4 ? (
                    <ActionArea
                        className={clsx(
                            'justify-around tablet:shadow-none px-6 tablet:px-12',
                            isSubmissionStep
                                ? ' tablet:justify-center tablet:items-center'
                                : 'tablet:justify-between'
                        )}
                    >
                        <Button
                            href='#'
                            variant={ButtonVariant.secondary}
                            className={clsx(
                                'w-[104px] h-[50px] border-2',
                                isSubmissionStep && 'tablet:hidden'
                            )}
                            onClick={goToPrevStep}
                        >
                            BACK
                        </Button>
                        <Button
                            href='#'
                            className='w-[223px] h-[50px] border-2'
                            onClick={goToNextStep}
                            // Don't disable the button if the only error on
                            // the form is a server error
                            isDisabled={
                                isSubmissionStep &&
                                (isSubmitting ||
                                    Object.keys(errors).length > 1 ||
                                    (Object.keys(errors).length === 1 &&
                                        !errors.root))
                            }
                        >
                            {isSubmissionStep ? (
                                isSubmitting ? (
                                    <PiSpinner className='h-6 w-6 text-black animate-spin' />
                                ) : (
                                    'SUBMIT'
                                )
                            ) : (
                                'NEXT'
                            )}
                        </Button>
                    </ActionArea>
                ) : null}
            </form>
        </div>
    );
};

export default NomineeSelection;
