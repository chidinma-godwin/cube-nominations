import ProgressBar from '@/components/ProgressBar';
import Image from 'next/image';
import Link from 'next/link';
import { RxPencil1 } from 'react-icons/rx';

type OverviewItemProps = {
    question: string;
    answer: string;
    url: string;
};

const Item = (props: OverviewItemProps) => (
    <div className='bg-gray-light mb-2 p-10'>
        <div className='flex justify-between'>
            <h2 className='font-bold mb-3'>{props.question}</h2>
            <Link href={props.url}>
                <RxPencil1 className='h-6 w-6 text-black' />
            </Link>
        </div>
        <p className='font-anonymous'>{props.answer}</p>
    </div>
);

const FinalStep = () => {
    // TODO: Get this dynamically
    const summary = [
        {
            question: "Cube's Name",
            answer: 'Some answer',
            url: '/nominee-selection',
        },
        {
            question: 'Reasoning',
            answer: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam impedit accusamus cum ex ducimus assumenda!',
            url: '/nomination-reason',
        },
        {
            question: 'Thoughts on Current Process',
            answer: 'Honest answer',
            url: 'fairness-opinion',
        },
    ];

    return (
        <>
            <div>
                <ProgressBar percentage={100} />
                <Image
                    className='tablet:px-12'
                    src='/overview.svg'
                    width={848}
                    height={402}
                    alt='A man working on his laptop'
                />
            </div>
            <div className='p-6 pb-28 tablet:px-12 tablet:py-6'>
                <h2 className='font-bold text-2xl mt-6 mb-3 text-center'>
                    NOMINATION OVERVIEW
                </h2>
                <p className='flex font-anonymous tablet:w-4/5 text-center mb-10 mt-2 mx-auto'>
                    Thank you for taking the time to nominate a fellow cube.
                    Please check your answers before submitting.
                </p>
                {summary.map(({ question, answer, url }) => (
                    <Item
                        key={question}
                        question={question}
                        answer={answer}
                        url={url}
                    />
                ))}
            </div>
        </>
    );
};

export default FinalStep;
