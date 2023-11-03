import Link, { LinkProps } from 'next/link';
import clsx from 'clsx';

type ButtonProps = {
    variant?: ButtonVariant;
} & LinkProps &
    Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'>;

export enum ButtonVariant {
    primary = 'primary',
    secondary = 'secondary',
}

const getClassNameForButtonVariant = (buttonVariant: ButtonVariant) => {
    switch (buttonVariant) {
        case ButtonVariant.primary:
            return `shadow-[0px_1px_10px_0px_#1A1A1914] text-white bg-black hover:bg-white hover:border-2 hover-border-black hover:text-black disabled:bg-gray disabled:text-white disabled:shadow-none disabled:cursor-not-allowed`;
        case ButtonVariant.secondary:
            return 'border-2 border-black text-black hover:border-pink hover:bg-gray-50 hover:shadow-[0px_1px_10px_0px_#1A1A1914] disabled:border-gray disabled:text-gray-dark disabled:cursor-not-allowed';
    }
};

const Button = (props: ButtonProps) => {
    const { className, variant, ...otherProps } = props;
    return (
        <Link
            className={clsx(
                'inline-flex items-center justify-center text-sm leading-6',
                getClassNameForButtonVariant(variant ?? ButtonVariant.primary),
                className
            )}
            {...otherProps}
        >
            {props.children}
        </Link>
    );
};

Button.defaultProps = {
    variant: ButtonVariant.primary,
};

export default Button;
