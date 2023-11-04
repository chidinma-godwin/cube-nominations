import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import ProgressBar from '@/components/ProgressBar';
import { FormInputs } from './type';

const ReasonStep = (props: {
    register: UseFormRegister<FormInputs>;
    errMsg: string | null;
    nomineeName: string | null;
}) => {
    // TODO: Get this from previous user input
    const nomineeName = 'Random';

    return (
        <>
            <div>
                <ProgressBar percentage={50} />
                <Image
                    className='tablet:px-12'
                    src='/nomination-reason.svg'
                    width={848}
                    height={402}
                    alt='Colleagues having conversation about work'
                />
            </div>
            <div className='p-6 pb-28 tablet:px-12 tablet:py-6'>
                <h2 className='font-bold text-2xl mt-6 mb-2'>
                    <>
                        I&apos;D LIKE TO NOMINATE
                        <span className='mx-2 uppercase text-pink'>
                            {props.nomineeName}
                        </span>
                        BECAUSE...
                    </>
                </h2>
                <p className='flex font-anonymous tablet:w-4/5 pb-6'>
                    Please let us know why you think this cube deserves the
                    &apos;cube of the month&apos; title &#127942;&#11088;
                </p>
                <label htmlFor='reason' className='block mb-2 font-bold my-4'>
                    Reasoning
                </label>
                <textarea
                    id='reason'
                    className='border border-gray text-black px-1.5 py-3 w-full font-anonymous mb-10'
                    {...props.register('reason')}
                />
                {props.errMsg ? (
                    <p className='text-error font-anonymous'>{props.errMsg}</p>
                ) : null}
            </div>
        </>
    );
};

export default ReasonStep;
