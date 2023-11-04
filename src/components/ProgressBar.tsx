const ProgressBar = (props: { percentage: number }) => {
    return (
        <div className='bg-black p-6 py-4 tablet:px-12 tablet:bg-white'>
            <span className='font-medium text-pink mb-2 justify-end hidden tablet:flex'>
                {`${props.percentage}%`}
            </span>
            <div className='w-full bg-[#F3F3F3] h-2'>
                <div
                    className='bg-pink h-2'
                    style={{ width: `${props.percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
