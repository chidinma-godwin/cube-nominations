import { Dispatch, SetStateAction, useState } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import SelectionStep from './SelectionStep';
import ReasonStep from './ReasonStep';
import ProcessFeedbackStep from './ProcessFeedbackStep';
import OverviewStep from './OverviewStep';
import { FormInputs } from './type';

const CurrentStep = (props: {
    step: number;
    register: UseFormRegister<FormInputs>;
    errors: FieldErrors<FormInputs>;
    setStep: Dispatch<SetStateAction<number>>;
    formData: FormInputs;
}) => {
    const [nomineeName, setNomineeName] = useState<string | null>(null);

    const { step, register, errors, setStep, formData } = props;

    switch (step) {
        case 0:
            return (
                <SelectionStep
                    register={register}
                    errMsg={errors.nomineeId?.message ?? null}
                    setNomineeName={setNomineeName}
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
        default:
            return (
                <SelectionStep
                    register={register}
                    errMsg={errors.nomineeId?.message ?? null}
                    setNomineeName={setNomineeName}
                />
            );
    }
};

export default CurrentStep;
