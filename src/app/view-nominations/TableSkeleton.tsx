const TableSkeleton = () => (
    <div className='w-full max-w-screen-laptop my-5 tablet:my-10 shadow mx-auto animate-pulse'>
        <div className='p-6 tablet:p-0'>
            <div className='h-10 w-[250px] mb-14 bg-gray' />
            <div className='mb-4'>
                <button className='w-[100px] h-[37px] tablet:w-[136px] tablet:h-[50px] mr-4 bg-gray' />
                <button className='w-[100px] h-[37px] tablet:w-[136px] tablet:h-[50px] bg-gray' />
            </div>
        </div>
        <table className='w-full text-left bg-gray'>
            <thead>
                <tr className='bg-[#F9FAFB]'>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <th key={i} className='p-6' />
                    ))}
                </tr>
            </thead>
            <tbody className='border-[#EAECF0] h-[300px]'>
                {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className='border-b' />
                ))}
            </tbody>
        </table>
    </div>
);

export default TableSkeleton;
