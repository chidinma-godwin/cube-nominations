import * as yup from 'yup';

export const formSchema = yup.object({
    nomineeId: yup.string().required('Please select a cube to nominate'),
    reason: yup.string().required('Please give a reason for your nomination'),
    process: yup
        .string()
        .oneOf(
            ['very_unfair', 'unfair', 'not_sure', 'fair', 'very_fair'],
            "Your opinion on our selection process must be one of: 'Very unfair', 'unfair', 'Not sure', 'fair', 'Very fair' "
        )
        .required(),
});

export type FormInputs = yup.InferType<typeof formSchema>;
