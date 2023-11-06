import * as yup from 'yup';

export const signUpSchema = yup.object({
    name: yup.string().required('Enter your name'),
    email: yup.string().required('Enter your email'),
    password: yup
        .string()
        .required('Enter your password')
        .min(8, 'Password is too short - should be at least 8 characters long'),
    confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

export type SignUpInputs = yup.InferType<typeof signUpSchema>;
