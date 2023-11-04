import ProgressBar from '@/components/ProgressBar';
import Image from 'next/image';

const ThirdFormStep = () => {
    return (
        <>
            <div>
                <ProgressBar percentage={75} />
                <Image
                    className='tablet:px-12'
                    src='/process-fairness.svg'
                    width={848}
                    height={402}
                    alt='Someone playing snooker'
                />
            </div>
            <div className='p-6 pb-28 tablet:px-12 tablet:py-6'>
                <h2 className='font-bold text-2xl mt-6 mb-2'>
                    IS HOW WE CURRENTLY RUN CUBE OF THE MONTH FAIR?
                </h2>
                <p className='flex font-anonymous tablet:w-4/5 pb-6'>
                    As you know, out the nominees chosen, we spin a wheel to
                    pick the cube of the month. What&apos;s your opinion on this
                    method?
                </p>
                <label
                    htmlFor='fairnessRange'
                    className='block mb-2 font-bold my-4'
                >
                    Reasoning
                </label>
                <input
                    type='range'
                    min='1'
                    max='100'
                    value='50'
                    id='fairnessRange'
                    className='w-full mb-10 hidden tablet:block'
                />
                <div className='tablet:hidden'>
                    <div className='w-full flex justify-between border border-gray p-3 mb-4'>
                        <label htmlFor='very-unfair'>Very unfair</label>
                        <input
                            type='radio'
                            id='very-unfair'
                            name='fav_language'
                            value='HTML'
                        />
                    </div>
                    <div className='w-full flex justify-between border border-gray p-3 mb-4'>
                        <label htmlFor='css'>Unfair</label>
                        <input
                            type='radio'
                            id='unfair'
                            name='fav_language'
                            value='CSS'
                        />
                    </div>
                    <div className='w-full flex justify-between border border-gray p-3 mb-4'>
                        <label htmlFor='javascript'>Not sure</label>
                        <input
                            type='radio'
                            id='not-sure'
                            name='fav_language'
                            value='JavaScript'
                        />
                    </div>
                    <div className='w-full flex justify-between border border-gray p-3 mb-4'>
                        <label htmlFor='javascript'>Fair</label>
                        <input
                            type='radio'
                            id='fair'
                            name='fav_language'
                            value='JavaScript'
                        />
                    </div>
                    <div className='w-full flex justify-between border border-gray p-3 mb-6'>
                        <label htmlFor='javascript'>Very Fair</label>
                        <input
                            type='radio'
                            id='very-fair'
                            name='fav_language'
                            value='JavaScript'
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThirdFormStep;
