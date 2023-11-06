import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import ProgressBar from '@/components/ProgressBar';
import { FormInputs } from './type';
import { useRetrieveNomineeList } from '@/data/nominationComponents';
import clsx from 'clsx';

const SelectionStep = (props: {
    register: UseFormRegister<FormInputs>;
    setNomineeName: Dispatch<SetStateAction<string | null>>;
    errMsg: string | null;
}) => {
    const { data, error: fetchErr, isLoading } = useRetrieveNomineeList({});

    const { onChange, ...restSelectProps } = props.register('nomineeId');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e);
        if (data?.data != null && data?.data.length > 0) {
            const selectedNominee = data.data.find(
                ({ nominee_id }) => nominee_id === e.target.value
            );

            if (selectedNominee != null) {
                props.setNomineeName(selectedNominee.first_name ?? null);
            }
        }
    };

    const options =
        data?.data?.map(({ nominee_id, first_name, last_name }) => {
            return {
                id: nominee_id,
                name: `${first_name} ${last_name}`,
            };
        }) ?? [];

    return (
        <>
            <div>
                <ProgressBar percentage={25} />
                <Image
                    className='mx-auto tablet:px-8'
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
                <label htmlFor='nominees' className='block mb-2 font-bold my-4'>
                    Cube&apos;s name
                </label>
                {/* <div id='nominees' className='relative w-[55%]'> */}
                {/* <button type='button'>
                        <PiCaretDownBold className='absolute right-4 top-[15%] w-6 h-6 text-pink' />
                   appearance-none
                   </button> */}
                <select
                    id='nominees'
                    className={clsx(
                        'border text-black px-1.5 py-3 w-[55%] font-anonymous mb-10',
                        props.errMsg || fetchErr
                            ? 'border-error'
                            : 'border-gray'
                    )}
                    {...restSelectProps}
                    onChange={handleChange}
                >
                    <option value=''>Select Option</option>
                    {options.map(({ id, name }) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    ))}
                </select>
                {/* </div> */}
                {fetchErr ? (
                    <p className='text-error font-anonymous'>
                        {fetchErr.payload}
                    </p>
                ) : null}
                {props.errMsg ? (
                    <p className='text-error font-anonymous'>{props.errMsg}</p>
                ) : null}
            </div>
        </>
    );
};

export default SelectionStep;
