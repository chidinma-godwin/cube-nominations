'use client';

import { useEffect, useState } from 'react';
import EmptyNominations from './EmptyNominations';
import { HiOutlineTrash } from 'react-icons/hi';
import { RxPencil1 } from 'react-icons/rx';
import clsx from 'clsx';
import ActionArea from '@/components/ActionArea';
import Button, { ButtonVariant } from '@/components/Button';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
import {
    fetchDeleteNomination,
    useGetAllNominations,
    useRetrieveNomineeList,
} from '@/data/nominationComponents';
import { Nominations, Nominee } from '@/data/nominationResponses';
import TableSkeleton from './TableSkeleton';
import useToken from '@/hooks/useToken';

type NominationType = {
    id: string;
    name: string;
    dateSubmitted: string;
    dueDate: string;
    reason: string;
    process: string;
};

enum SortByType {
    current = 'current',
    closed = 'closed',
}

const getFormattedData = (args: {
    nominations: Nominations['data'];
    nominees: Nominee['data'];
}): NominationType[] => {
    if (args.nominations == null) {
        return [];
    }
    return args.nominations.map((nominee) => {
        const { first_name, last_name } =
            args.nominees?.find(
                ({ nominee_id }) => nominee_id === nominee.nominee_id
            ) ?? {};

        return {
            id: nominee.nomination_id,
            name:
                first_name || last_name
                    ? `${first_name} ${last_name}`
                    : 'No Name',
            dueDate: nominee.closing_date,
            dateSubmitted: nominee.date_submitted,
            reason: nominee.reason,
            process: nominee.process,
        };
    });
};

const ViewNominations = () => {
    const [sortBy, setSortBy] = useState<SortByType>(SortByType.current);
    const [nominationToDeleteId, setNominationToDeleteId] = useState<
        string | null
    >(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteErrMsg, setDeleteErrMsg] = useState<string | null>(null);

    const router = useRouter();

    const {
        data: nominations,
        isFetching,
        error,
        isFetched,
    } = useGetAllNominations({});

    const { data: nomineesData } = useRetrieveNomineeList({});

    const { authToken } = useToken();

    const data: NominationType[] = getFormattedData({
        nominations: nominations?.data,
        nominees: nomineesData?.data,
    });

    const [filteredData, setFilteredData] = useState<NominationType[]>(data);

    useEffect(() => {
        if (isFetched) {
            setFilteredData(data);
        }

        // We only want to run this when the data is initially fetched
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetched]);

    const filterCurrent = () => {
        setSortBy(SortByType.current);
        const filteredNominations = data.filter(
            ({ dueDate }) =>
                // Compare current date to a seconds before end of closing date
                new Date(new Date(dueDate).setHours(23, 59, 59, 0)).getTime() -
                    new Date().getTime() >
                0
        );
        if (filteredNominations.length > 0) {
            setFilteredData(filteredNominations);
        } else {
            // This is to prevent showing the empty nominations screen
            setFilteredData([
                {
                    id: '',
                    name: '',
                    dateSubmitted: '',
                    dueDate: '',
                    reason: '',
                    process: '',
                },
            ]);
        }
    };

    const filterClosed = () => {
        setSortBy(SortByType.closed);

        const filteredNominations = data.filter(
            ({ dueDate }) =>
                new Date(new Date(dueDate).setHours(23, 59, 59, 0)).getTime() -
                    new Date().getTime() <
                0
        );
        if (filteredNominations.length > 0) {
            setFilteredData(filteredNominations);
        } else {
            // This is to prevent showing the empty nominations screen
            setFilteredData([
                {
                    id: '',
                    name: '',
                    dateSubmitted: '',
                    dueDate: '',
                    reason: '',
                    process: '',
                },
            ]);
        }
    };

    const handleDelete = async () => {
        try {
            if (nominationToDeleteId) {
                await fetchDeleteNomination({
                    pathParams: {
                        nominationId: nominationToDeleteId,
                    },
                    headers: {
                        authorization: `Bearer ${authToken}`,
                    },
                });
                setIsModalOpen(false);
                setFilteredData((prev) =>
                    prev.filter(({ id }) => id != nominationToDeleteId)
                );
            }
        } catch (err: any) {
            setDeleteErrMsg(err.message);
        }
    };

    const handleEdit = (id: string) => {
        router.push(`/nominee-selection?id=${id}`);
    };

    const openModalAndSetIdToDelete = (id: string) => {
        setIsModalOpen(() => {
            setNominationToDeleteId(id);
            return true;
        });
    };

    const closeModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setIsModalOpen(false);
    };

    if (isFetching) {
        return <TableSkeleton />;
    }

    if (error) {
        return (
            <div className='w-full h-[300px] max-w-screen-tablet my-5 tablet:my-10 bg-white flex text-error items-center justify-center font-bold font-anonymous text-2xl'>
                {error.payload}
            </div>
        );
    }

    return (
        <div className='max-w-screen-laptop my-5 tablet:my-10 w-full'>
            {filteredData.length > 0 ? (
                <>
                    <div className='p-6 tablet:p-0'>
                        <h1 className='text-2xl tablet:text-3xl font-bold mb-7 tablet:mb-14'>
                            YOUR NOMINATIONS
                        </h1>
                        <div className='mb-4'>
                            <button
                                className={clsx(
                                    'w-[100px] h-[37px] tablet:w-[136px] tablet:h-[50px] leading:[30px] mr-4',
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
                                {filteredData.map(
                                    ({
                                        id,
                                        name,
                                        reason,
                                        process,
                                        dueDate,
                                        dateSubmitted,
                                    }) => (
                                        <tr key={id} className='border-b'>
                                            <td className='w-[20%] p-4  pl-6'>
                                                {name}
                                            </td>
                                            <td className='w-[20%] p-4'>
                                                {dateSubmitted}
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
                                                {/* This is to prevent showing the icon when the filtered data is empty */}
                                                {id ? (
                                                    <span className='flex justify-center align-center'>
                                                        <button
                                                            type='button'
                                                            onClick={() => {
                                                                openModalAndSetIdToDelete(
                                                                    id
                                                                );
                                                            }}
                                                        >
                                                            <HiOutlineTrash className='h-10 w-10 text-black p-2' />
                                                        </button>

                                                        <button
                                                            type='button'
                                                            onClick={() =>
                                                                handleEdit(id)
                                                            }
                                                        >
                                                            <RxPencil1 className='h-10 w-10 text-black p-2' />
                                                        </button>
                                                    </span>
                                                ) : null}
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
                            {filteredData.map(({ id, name, reason }) => (
                                <div
                                    key={id}
                                    className='grid grid-cols-4 gap-1 border-b px-4 py-6'
                                >
                                    <div className='font-anonymous leading-[30px] col-span-3'>
                                        <p className='font-bold mb-1'>{name}</p>
                                        <p className='truncate'>{reason}</p>
                                    </div>

                                    {id ? (
                                        <div className='flex justify-center align-center'>
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    openModalAndSetIdToDelete(
                                                        id
                                                    )
                                                }
                                            >
                                                <HiOutlineTrash className='h-10 w-10 text-black p-2 mr-2' />
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() => handleEdit(id)}
                                            >
                                                <RxPencil1 className='h-10 w-10 text-black p-2' />
                                            </button>
                                        </div>
                                    ) : null}
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
                            <span className='font-anonymous leading-[30px] mb-10 px-6'>
                                If you delete this nomination, the nominee will
                                no longer be put forward by you.
                            </span>
                            <p className='text-error font-anonymous mb-6 pl-6'>
                                {deleteErrMsg}
                            </p>
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
