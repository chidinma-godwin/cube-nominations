import { ReactNode } from 'react';
import clsx from 'clsx';

type ActionAreaProps = {
    children: ReactNode;
    className?: string;
};

const ActionArea = (props: ActionAreaProps) => {
    return (
        <div
            className={clsx(
                'flex fixed bottom-0 left-0 right-0 w-full bg-white shadow-[0px_2px_10px_0px_#1A1A193D] tablet:relative py-5',
                props.className
            )}
        >
            {props.children}
        </div>
    );
};

export default ActionArea;
