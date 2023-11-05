'use client';

import { useState } from 'react';
import EmptyNominations from './EmptyNominations';
import { HiOutlineTrash } from 'react-icons/hi';
import { RxPencil1 } from 'react-icons/rx';
import clsx from 'clsx';
import ActionArea from '@/components/ActionArea';
import Button, { ButtonVariant } from '@/components/Button';
import Link from 'next/link';
import Modal from '@/components/Modal';

type NominationsType = {
    nominee: string;
    dateSubmited: string;
    dueDate: string;
    reason: string;
    process: string;
};

enum SortByType {
    current = 'current',
    closed = 'closed',
}

const ViewNominations = () => {
    const [sortBy, setSortBy] = useState<SortByType>(SortByType.current);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allNominations: NominationsType[] = [
        {
            nominee: 'Some Person',
            dateSubmited: 'some-date',
            dueDate: 'future-date',
            reason: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam impedit accusamus cum ex ducimus assumenda!',
            process: 'Fair',
        },
        {
            nominee: 'Some Person',
            dateSubmited: 'some-date',
            dueDate: 'future-date',
            reason: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam impedit accusamus cum ex ducimus assumenda!',
            process: 'Fair',
        },
    ];

    const filterCurrent = () => {
        setSortBy(SortByType.current);
    };

    const filterClosed = () => {
        setSortBy(SortByType.closed);
    };

    const handleDelete = () => {
        setIsModalOpen(false);
    };

    const closeModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setIsModalOpen(false);
    };

    return (
        <div className='max-w-screen-laptop my-5 tablet:my-10 tablet:my-0'>
            {allNominations.length > 0 ? (
                <>
                    <h1 className='text-3xl font-bold mb-7 tablet:mb-14'>
                        YOUR NOMINATIONS
                    </h1>
                    <div className='mb-4'>
                        <button
                            className={clsx(
                                ' w-[136px] h-[50px] leading:[30px] mr-4',
                                sortBy === SortByType.current
                                    ? 'bg-white text-black font-bold shadow-[0px_2px_10px_0px_#1A1A193D]'
                                    : 'bg-green text-gray-dark font-anonymous'
                            )}
                            onClick={filterCurrent}
                        >
                            Current
                        </button>
                        <button
                            className={clsx(
                                'w-[136px] h-[50px] leading-[30px]',
                                sortBy === SortByType.closed
                                    ? 'bg-white text-black font-bold shadow-[0px_2px_10px_0px_#1A1A193D]'
                                    : 'bg-green text-gray-dark font-anonymous'
                            )}
                            onClick={filterClosed}
                        >
                            Closed
                        </button>
                    </div>
                    <div className='relative bg-white hidden tablet:block tablet:shadow-[0px_2px_10px_0px_#1A1A193D]'>
                        <table className='w-full text-left '>
                            <thead>
                                <tr className='bg-[#F9FAFB]'>
                                    <th className='p-4 pl-6'>NOMINEE</th>
                                    <th className='p-4'>DATE SUBMITTED</th>
                                    <th className='p-4'>CLOSING DATE</th>
                                    <th className='p-4'>REASON</th>
                                    <th className='p-4'>PROCESS</th>
                                    <th className='p-4' />
                                </tr>
                            </thead>
                            <tbody className='font-anonymous leading-[30px] border-[#EAECF0]'>
                                {allNominations.map(
                                    ({
                                        nominee,
                                        dateSubmited,
                                        dueDate,
                                        reason,
                                        process,
                                    }) => (
                                        <tr key={nominee} className='border-b'>
                                            <td className='w-[20%] p-4  pl-6'>
                                                {nominee}
                                            </td>
                                            <td className='w-[20%] p-4'>
                                                {dateSubmited}
                                            </td>
                                            <td className='w-[20%]  p-4'>
                                                {dueDate}
                                            </td>
                                            <td className='w-[30%]  p-4 truncate max-w-[330px]'>
                                                {reason}
                                            </td>
                                            <td className='w-[5%]  p-4'>
                                                {process}
                                            </td>
                                            <td className='w-[5%]  p-4'>
                                                <span className='flex justify-center align-center'>
                                                    <HiOutlineTrash
                                                        className='h-10 w-10 text-black p-2'
                                                        onClick={() =>
                                                            setIsModalOpen(true)
                                                        }
                                                    />
                                                    <Link href='/nominee-selection'>
                                                        <RxPencil1 className='h-10 w-10 text-black p-2' />
                                                    </Link>
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className='tablet:hidden w-full'>
                        <h3 className='bg-gray-light p-6 font-bold'>Nominee</h3>
                        <div className='bg-white'>
                            {allNominations.map(({ nominee, reason }) => (
                                <div
                                    key={nominee}
                                    className='grid grid-cols-4 gap-1 border-b px-4 py-6'
                                >
                                    <div className='font-anonymous leading-[30px] col-span-3'>
                                        <p className='font-bold mb-1'>
                                            {nominee}
                                        </p>
                                        <p className='truncate'>{reason}</p>
                                    </div>
                                    <div className='flex justify-center align-center'>
                                        <HiOutlineTrash className='h-10 w-10 text-black p-2 mr-2' />
                                        <RxPencil1 className='h-10 w-10 text-black p-2' />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ActionArea className='justify-center tablet:shadow-none'>
                            <Button
                                href='/nominee-selection'
                                variant={ButtonVariant.secondary}
                                className='w-full mx-6 tablet:w-[223px] h-[50px] font-bold leading-6'
                            >
                                CREATE NEW NOMINATION
                            </Button>
                        </ActionArea>
                    </div>
                    {isModalOpen ? (
                        <Modal>
                            <h2 className='text-lg font-bold leading-[48px] mb-2 px-6'>
                                DELETE THIS NOMINATION
                            </h2>
                            <span className='font-anonymous leading-[30px] mb-12 px-6'>
                                If you delete this nomination, the nominee will
                                no longer be put forward by you.
                            </span>
                            <ActionArea className='flex-col shadow-[0px_2px_10px_0px_#1A1A193D] px-6'>
                                <Button
                                    href='#'
                                    variant={ButtonVariant.secondary}
                                    className='w-full mb-4 py-2'
                                    onClick={handleDelete}
                                >
                                    Yes, DELETE
                                </Button>
                                <Button
                                    href='#'
                                    variant={ButtonVariant.secondary}
                                    onClick={closeModal}
                                    className='w-full py-2'
                                >
                                    Cancel
                                </Button>
                            </ActionArea>
                        </Modal>
                    ) : null}
                </>
            ) : (
                <EmptyNominations />
            )}
        </div>
    );
};

export default ViewNominations;
