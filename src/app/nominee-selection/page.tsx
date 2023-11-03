import Button, { ButtonVariant } from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import Image from 'next/image';

const NomineeSelection = () => {
    return (
        <>
            <div>
                <ProgressBar percentage={80} />
                <Image
                    className='tablet:px-12'
                    src='/nominee-selection.svg'
                    width={848}
                    height={402}
                    alt='Two colleagues discussing'
                />
            </div>
            <div className='p-6 tablet:p-12'>
                <h2 className='font-bold text-2xl mt-6 mb-2'>
                    I&apos;D Like To Nominate...
                </h2>
                <span className='flex font-anonymous tablet:w-4/5'>
                    Please select a cube who you feel has done something
                    honourable this month or just all round has a great work
                    ethic.
                </span>
                <form>
                    <label
                        htmlFor='nominees'
                        className='block mb-2 font-bold my-4'
                    >
                        Cube&apos;s name
                    </label>
                    <select
                        required
                        id='nominees'
                        className='border border-gray text-black px-1.5 py-3 w-[55%] font-anonymous mb-10'
                    >
                        <option selected>Select Option</option>
                    </select>
                    <div className='flex justify-around fixed bottom-0 left-0 right-0 w-full bg-white shadow-[0px_2px_10px_0px_#1A1A193D] tablet:relative tablet:shadow-none tablet:justify-between py-5'>
                        <Button
                            href='/'
                            variant={ButtonVariant.secondary}
                            className='w-[104px] h-[50px] border-2'
                        >
                            Back
                        </Button>
                        <Button
                            href='/'
                            className='w-[223px] h-[50px] border-2'
                            isDisabled
                        >
                            Next
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NomineeSelection;
