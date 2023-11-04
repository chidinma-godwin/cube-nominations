import Image from 'next/image';
import ProgressBar from '@/components/ProgressBar';

const FirstStepInput = () => {
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
                    I&apos;D Like To Nominate...
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
                    required
                    id='nominees'
                    className='border border-gray text-black px-1.5 py-3 w-[55%] font-anonymous mb-10'
                >
                    {/* TODO: Fetch the nominees list and display them here */}
                    <option>Select Option</option>
                </select>
            </div>
        </>
    );
};

export default FirstStepInput;
