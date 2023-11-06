'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrors, useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import { PiSpinner } from 'react-icons/pi';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import ActionArea from '@/components/ActionArea';
import Button from '@/components/Button';
import { SignUpInputs, signUpSchema } from './type';
import { fetchRegister } from '@/data/nominationComponents';
import useToken from '@/hooks/useToken';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<SignUpInputs>({
        resolver: yupResolver(signUpSchema),
    });

    const { setAuthToken } = useToken();

    const router = useRouter();

    const handleSignup = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        handleSubmit(async (data) => {
            try {
                const response = await fetchRegister({
                    body: {
                        name: data.name,
                        email: data.email,
                        password: data.password,
                    },
                });
                const authToken = response.data?.authToken;

                if (authToken) {
                    setAuthToken(authToken);
                    localStorage.setItem('token', authToken);
                    router.push('/');
                }
            } catch (err: any) {
                setError('root.signupError', {
                    message: err.message,
                });
            }
        })();
    };

    const allErrors: FieldErrors<SignUpInputs> = Object.entries(errors).reduce(
        (acc, [key, value]) => ({
            ...acc,
            ...(key === 'root' ? { ...value } : { [key]: value }),
        }),
        {}
    );

    return (
        <div className='flex flex-col justify-center items-center p-10 bg-white w-full tablet:w-[700px]'>
            <FaUserCircle className='h-20 w-20 text-black mb-10' />
            <p>
                Already registered?
                <Link href='/account/login' className='text-pink ml-2'>
                    Login
                </Link>
            </p>
            <form className='w-full'>
                <label htmlFor='name' className='block mb-2 font-bold my-4'>
                    Username
                </label>
                <input
                    type='text'
                    id='name'
                    className={clsx(
                        'border text-black px-1.5 py-3 w-full tablet:w-5/6 font-anonymous mb-6',
                        errors.name ? 'border-error' : 'border-gray'
                    )}
                    {...register('name')}
                />
                <label htmlFor='email' className='block mb-2 font-bold my-4'>
                    Email
                </label>
                <input
                    type='text'
                    id='email'
                    className={clsx(
                        'border text-black px-1.5 py-3 w-full tablet:w-5/6 font-anonymous mb-6',
                        errors.email ? 'border-error' : 'border-gray'
                    )}
                    {...register('email')}
                />
                <label htmlFor='password' className='block mb-2 font-bold my-4'>
                    Password
                </label>
                <input
                    type='password'
                    id='password'
                    className={clsx(
                        'border text-black px-1.5 py-3 w-full tablet:w-5/6 font-anonymous mb-6',
                        errors.password ? 'border-error' : 'border-gray'
                    )}
                    {...register('password')}
                />
                <label
                    htmlFor='confirm_password'
                    className='block mb-2 font-bold my-4'
                >
                    Confirm Password
                </label>
                <input
                    type='password'
                    id='confirm_password'
                    className={clsx(
                        'border text-black px-1.5 py-3 w-full tablet:w-5/6 font-anonymous mb-6',
                        errors.confirmPassword ? 'border-error' : 'border-gray'
                    )}
                    {...register('confirmPassword')}
                />
                <div className='px-6 tablet:px-12 text-error font-anonymous'>
                    {Object.keys(allErrors).length > 0
                        ? Object.values(errors).map((error) => (
                              <p key={error.message} className='mb-2'>
                                  {error.message}
                              </p>
                          ))
                        : null}
                </div>
                <ActionArea className='justify-center tablet:shadow-none'>
                    <Button
                        href='/nominee-selection'
                        className='w-full mx-6 tablet:w-[223px] h-[50px] font-bold leading-6'
                        onClick={handleSignup}
                        isDisabled={
                            Object.keys(errors).length > 0 || isSubmitting
                        }
                    >
                        {isSubmitting ? (
                            <PiSpinner className='w-6 h-6 text-blaxk animate-spin' />
                        ) : (
                            'SIGN UP'
                        )}
                    </Button>
                </ActionArea>
            </form>
        </div>
    );
};

export default SignUp;
