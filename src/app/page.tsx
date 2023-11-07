import ActionArea from '@/components/ActionArea';
import Button from '@/components/Button';
import Image from 'next/image';

const Home = () => {
    return (
        <div className='max-w-screen-tablet bg-white'>
            <Image
                className='w-full'
                width={800}
                height={305}
                src='/hero.svg'
                alt='Team members at the office'
                priority
            />
            <div className='bg-white pt-3 pb-11 px-4 tablet:px-32 text-center'>
                <h1 className='font-bold text-3xl mt-6 mb-2'>
                    CUBE OF THE MONTH NOMINATIONS
                </h1>
                <div className='font-anonymous mb-2'>
                    At cube we’re passionate about recognising the great work
                    that our cubes do. Each month one of our cubes are crowned
                    cube of the month &#128081;&#11088;. Please nominate who you
                    think deserves this months title.
                </div>
                <ActionArea className='justify-center tablet:shadow-none'>
                    <Button
                        href='/nominee-selection'
                        className='font-bold m-5 w-full h-[50px] tablet:w-[327px]'
                    >
                        GET STARTED
                    </Button>
                </ActionArea>
            </div>
        </div>
    );
};

export default Home;
