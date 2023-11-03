import Link, { LinkProps } from 'next/link';
import clsx from 'clsx';

type ButtonProps = {
    variant?: ButtonVariant;
    isDisabled?: boolean;
} & LinkProps &
    Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'>;

export enum ButtonVariant {
    primary = 'primary',
    secondary = 'secondary',
}

const getClassNameForButtonVariant = (args: {
    buttonVariant: ButtonVariant;
    isDisabled: boolean;
}) => {
    switch (args.buttonVariant) {
        case ButtonVariant.primary:
            return `shadow-[0px_1px_10px_0px_#1A1A1914] text-white bg-black hover:bg-white hover:border-2 hover-border-black hover:text-black${
                args.isDisabled
                    ? ' shadow-none text-white bg-gray pointer-events-none'
                    : ''
            }`;
        case ButtonVariant.secondary:
            return `border-2 border-black text-black hover:border-pink hover:bg-gray-50 hover:shadow-[0px_1px_10px_0px_#1A1A1914]${
                args.isDisabled
                    ? ' border-gray text-gray-dark pointer-events-none'
                    : ''
            }`;
    }
};

const Button = (props: ButtonProps) => {
    const { className, variant, isDisabled, ...otherProps } = props;
    return (
        <Link
            className={clsx(
                'inline-flex items-center justify-center text-sm leading-6',
                getClassNameForButtonVariant({
                    buttonVariant: variant ?? ButtonVariant.primary,
                    isDisabled: isDisabled ?? false,
                }),
                className
            )}
            {...otherProps}
        >
            {props.children}
        </Link>
    );
};

export default Button;
