'use client';

import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister, FieldErrors, UseFormReset } from 'react-hook-form';
import SelectionStep from './SelectionStep';
import ReasonStep from './ReasonStep';
import ProcessFeedbackStep from './ProcessFeedbackStep';
import OverviewStep from './OverviewStep';
import { FormInputs } from './type';
import { useRetrieveNomineeList } from '@/data/nominationComponents';
import NominationSubmited from './NominationSubmitted';

export type SelectOptionType = {
    id?: string;
    name?: string;
};

const CurrentStep = (props: {
    step: number;
    register: UseFormRegister<FormInputs>;
    errors: FieldErrors<FormInputs>;
    setStep: Dispatch<SetStateAction<number>>;
    formData: FormInputs;
    reset: UseFormReset<FormInputs>;
}) => {
    const { step, register, errors, setStep, formData } = props;

    const { data } = useRetrieveNomineeList({});

    const options: SelectOptionType[] =
        data?.data?.map(({ nominee_id, first_name, last_name }) => ({
            id: nominee_id,
            name: first_name && last_name ? `${first_name} ${last_name}` : '',
        })) ?? [];

    const { first_name, last_name } =
        data?.data?.find(
            ({ nominee_id }) => nominee_id === props.formData.nomineeId
        ) ?? {};
    const nomineeName =
        first_name && last_name ? `${first_name} ${last_name}` : '';

    switch (step) {
        case 0:
            return (
                <SelectionStep
                    register={register}
                    errMsg={errors.nomineeId?.message ?? null}
                    options={options}
                />
            );
        case 1:
            return (
                <ReasonStep
                    register={register}
                    errMsg={errors.reason?.message ?? null}
                    nomineeName={nomineeName}
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
            return (
                <OverviewStep
                    errors={errors}
                    setStep={setStep}
                    nomineeName={nomineeName}
                    formData={formData}
                />
            );
        case 4:
            return (
                <NominationSubmited
                    setStep={props.setStep}
                    reset={props.reset}
                />
            );
        default:
            return (
                <SelectionStep
                    register={register}
                    errMsg={errors.nomineeId?.message ?? null}
                    options={options}
                />
            );
    }
};

export default CurrentStep;
