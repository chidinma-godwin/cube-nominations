import { useLayoutEffect } from 'react';
import ActionArea from '@/components/ActionArea';
import Button, { ButtonVariant } from '@/components/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useToken from '@/hooks/useToken';

const NominationSubmited = () => {
    const router = useRouter();
    const { authToken } = useToken();

    useLayoutEffect(() => {
        if (!authToken) {
            router.push('/account/login');
        }
    }, [router, authToken]);

    return (
        <div className='max-w-screen-tablet bg-white'>
            <Image
                src='/success.svg'
                width={848}
                height={402}
                alt='Team members having fun at the beach'
            />
            <div className='p-6 tablet:p-8'>
                <h2 className='font-bold text-2xl mt-6 mb-3 text-center'>
                    NOMINATION SUBMITTED
                </h2>
                <p className='flex font-anonymous tablet:w-4/5 text-center mb-10 mt-2 mx-auto h-[250px] tablet:h-[45px]'>
                    Thank you for taking the time to fill out this form! Why not
                    nominate another cube?
                </p>
                <ActionArea className='justify-center tablet:shadow-none'>
                    <Button
                        href='/view-nominations'
                        variant={ButtonVariant.secondary}
                        className='w-[223px] h-[50px] border-2 hidden tablet:inline-flex font-bold mr-4'
                    >
                        VIEW NOMINATIONS
                    </Button>
                    <Button
                        href='/nominee-selection'
                        variant={ButtonVariant.secondary}
                        className='w-full mx-6 tablet:w-[223px] h-[50px] border-2 font-bold'
                    >
                        CREATE NEW NOMINATION
                    </Button>
                </ActionArea>
            </div>
        </div>
    );
};

export default NominationSubmited;
