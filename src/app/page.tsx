import Button from '@/components/Button';
import Image from 'next/image';

const Home = () => {
    return (
        <>
            <Image
                className=''
                width={848}
                height={402}
                src='/hero.svg'
                alt='Team members at the office'
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
                <div className='fixed bottom-0 left-0 right-0 w-full bg-white flex justify-center tablet:relative'>
                    <Button className='font-bold m-5 w-full h-[50px] tablet:w-[327px]'>
                        GET STARTED
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Home;
