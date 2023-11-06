import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string().required('Enter your email'),
    password: yup
        .string()
        .required('Enter your password')
        .min(8, 'Password is too short - should be at least 8 characters long'),
});

export type LoginInputs = yup.InferType<typeof loginSchema>;
