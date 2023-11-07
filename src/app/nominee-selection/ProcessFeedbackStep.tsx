'use client';

import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import {
    BsFillEmojiSmileFill,
    BsFillEmojiNeutralFill,
    BsFillEmojiFrownFill,
} from 'react-icons/bs';
import { MdEmojiEmotions } from 'react-icons/md';
import { HiEmojiSad } from 'react-icons/hi';
import ProgressBar from '@/components/ProgressBar';
import useScreenSize from '@/hooks/useScreen';
import { FormInputs } from './type';

const ProcessFeedbackStep = (props: {
    register: UseFormRegister<FormInputs>;
    errMsg: string | null;
}) => {
    const screenSize = useScreenSize();

    return (
        <>
            <div>
                <ProgressBar percentage={75} />
                <Image
                    className='tablet:px-12 w-full'
                    src='/process-fairness.png'
                    width={848}
                    height={175.77}
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
                {screenSize.width >= 849 ? (
                    <Slider register={props.register} />
                ) : (
                    <Radio register={props.register} />
                )}
                {props.errMsg ? (
                    <p className='text-error font-anonymous mt-6'>
                        {props.errMsg}
                    </p>
                ) : null}
            </div>
        </>
    );
};

const Slider = (props: { register: UseFormRegister<FormInputs> }) => (
    <>
        <input
            type='range'
            min='20'
            max='100'
            step='20'
            id='process'
            className='w-full mb-10 accent-pink hidden tablet:block'
            list='markers'
            {...props.register('process')}
        />
        <datalist id='markers' className='flex justify-between w-full'>
            <option className='flex flex-col font-anonymous' value='20'>
                <div>
                    <HiEmojiSad className='w-8 h-8 text-black' />
                    <span>Very Unfair</span>
                </div>
            </option>
            <option className='font-anonymous' value='40' label='Unfair'>
                <div>
                    <BsFillEmojiFrownFill className='w-8 h-8 text-black' />
                    <span>Unfair</span>
                </div>
            </option>
            <option className='font-anonymous' value='60'>
                <div>
                    <BsFillEmojiNeutralFill className='w-8 h-8 text-black' />
                    <span>Not Sure</span>
                </div>
            </option>
            <option className='font-anonymous' value='80'>
                <div>
                    <BsFillEmojiSmileFill className='w-8 h-8 text-black' />
                    <span>Fair</span>
                </div>
            </option>
            <option className='font-anonymous' value='100' label='Very Fair'>
                <div>
                    <MdEmojiEmotions className='w-8 h-8 text-black' />
                    <span>Very Fair</span>
                </div>
            </option>
        </datalist>
    </>
);

const Radio = (props: { register: UseFormRegister<FormInputs> }) => (
    <div className='tablet:hidden'>
        <div className='w-full flex justify-between border border-gray p-3 mb-4'>
            <label htmlFor='very-unfair'>Very Unfair</label>
            <input
                type='radio'
                id='very_unfair'
                className='accent-pink'
                value='20'
                {...props.register('process')}
            />
        </div>
        <div className='w-full flex justify-between border border-gray p-3 mb-4'>
            <label htmlFor='unfair'>Unfair</label>
            <input
                type='radio'
                id='unfair'
                className='accent-pink'
                value='40'
                {...props.register('process')}
            />
        </div>
        <div className='w-full flex justify-between border border-gray p-3 mb-4'>
            <label htmlFor='not_sure'>Not sure</label>
            <input
                type='radio'
                id='not_sure'
                className='accent-pink'
                value='60'
                {...props.register('process')}
            />
        </div>
        <div className='w-full flex justify-between border border-gray p-3 mb-4'>
            <label htmlFor='fair'>Fair</label>
            <input
                type='radio'
                id='fair'
                className='accent-pink'
                value='80'
                {...props.register('process')}
            />
        </div>
        <div className='w-full flex justify-between border border-gray p-3 mb-6'>
            <label htmlFor='very_fair'>Very Fair</label>
            <input
                type='radio'
                id='very_fair'
                className='accent-pink'
                value='100'
                {...props.register('process')}
            />
        </div>
    </div>
);

export default ProcessFeedbackStep;
