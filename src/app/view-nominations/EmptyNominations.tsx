import ActionArea from '@/components/ActionArea';
import Button from '@/components/Button';
import { FaInbox } from 'react-icons/fa';

const EmptyNominations = () => {
    return (
        <div className='flex flex-col justify-center items-center px-10 py-32 w-full tablet:p-20 tablet:w-2/3 m-auto'>
            <FaInbox className='h-28 w-28 text-gray mb-14' />
            <span className='font-bold mb-12 text-2xl text-gray-dark text-center'>
                ONCE YOU SUBMIT A NOMINATION, YOU WILL BE ABLE TO VIEW AND EDIT
                IT HERE.
            </span>
            <ActionArea className='justify-center tablet:shadow-none'>
                <Button
                    href='/nominee-selection'
                    className='w-full mx-6 tablet:w-[223px] h-[50px] font-bold leading-6'
                >
                    CREATE NEW NOMINATION
                </Button>
            </ActionArea>
        </div>
    );
};

export default EmptyNominations;
