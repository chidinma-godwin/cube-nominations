import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import ProgressBar from '@/components/ProgressBar';
import { FormInputs } from './type';

const FirstStepInput = (props: {
    register: UseFormRegister<FormInputs>;
    errMsg: string | null;
}) => {
    return (
        <>
            <div>
                <ProgressBar percentage={25} />
                <Image
                    className='tablet:px-12'
                    src='/nominee-selection.svg'
                    width={848}
                    height={402}
                    alt='Two colleagues discussing'
                />
            </div>
            <div className='p-6 pb-28 tablet:px-12 tablet:py-6'>
                <h2 className='font-bold text-2xl mt-6 mb-2'>
                    I&apos;D LIKE TO NOMINATE...
                </h2>
                <p className='flex font-anonymous tablet:w-4/5 pb-6'>
                    Please select a cube who you feel has done something
                    honourable this month or just all round has a great work
                    ethic.
                </p>
                {/* <form> */}
                <label htmlFor='nominees' className='block mb-2 font-bold my-4'>
                    Cube&apos;s name
                </label>
                <select
                    id='nominees'
                    className='border border-gray text-black px-1.5 py-3 w-[55%] font-anonymous mb-10'
                    {...props.register('nomineeId')}
                >
                    {/* TODO: Fetch the nominees list and display them here */}
                    <option>Select Option</option>
                </select>
                {props.errMsg ? (
                    <p className='text-error font-anonymous'>{props.errMsg}</p>
                ) : null}
            </div>
        </>
    );
};

export default FirstStepInput;
