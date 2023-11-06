'use client';

import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrors, useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import { PiSpinner } from 'react-icons/pi';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import ActionArea from '@/components/ActionArea';
import Button from '@/components/Button';
import useToken from '@/hooks/useToken';
import { useLogin } from '@/data/nominationComponents';
import { LoginInputs, loginSchema } from './type';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<LoginInputs>({
        resolver: yupResolver(loginSchema),
    });

    const { setAuthToken } = useToken();

    const { mutateAsync } = useLogin();

    const router = useRouter();

    const handleLogin = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        handleSubmit(async (data) => {
            try {
                const { data: loginData } = await mutateAsync({
                    body: {
                        email: data.email,
                        password: data.password,
                    },
                });
                const authToken = loginData?.authToken;

                if (authToken) {
                    setAuthToken(authToken);
                    localStorage.setItem('token', authToken);
                    router.push('/');
                }
            } catch (err: any) {
                if (err) {
                    setError('root.loginError', {
                        message: err.message,
                    });
                }
            }
        })();
    };

    const allErrors: FieldErrors<LoginInputs> = Object.entries(errors).reduce(
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
                Don&apos;t have an account?
                <Link href='/account/signup' className='text-pink ml-2'>
                    Sign up
                </Link>
            </p>
            <form className='w-full'>
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
                <div className='px-6 tablet:px-12 text-error font-anonymous'>
                    {Object.keys(allErrors).length > 0
                        ? Object.values(allErrors).map((error) => (
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
                        onClick={handleLogin}
                        isDisabled={
                            isSubmitting ||
                            Object.keys(errors).length > 1 ||
                            (Object.keys(errors).length === 1 && !errors.root)
                        }
                    >
                        {isSubmitting ? (
                            <PiSpinner className='w-6 h-6 text-blaxk animate-spin' />
                        ) : (
                            'LOGIN'
                        )}
                    </Button>
                </ActionArea>
            </form>
        </div>
    );
};

export default Login;
