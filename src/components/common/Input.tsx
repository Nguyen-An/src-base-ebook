import * as React from 'react';
import { cn } from '@/utils/utils';
import { EyeIcon, EyeOffIcon, Dot } from 'lucide-react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { Label } from './Label';

// #region Input
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

// #endregion

// #region Input password
export interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    onToggleIcon?: () => void
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ type, onToggleIcon, ...props }, ref) => {
        return (
            <div className='relative'>
                <Input ref={ref} type={type} {...props} />
                {
                    type === 'password' ?
                        <EyeOffIcon className='absolute w-6 h-6 right-3 top-2 hover:cursor-pointer' onClick={onToggleIcon} /> :
                        <EyeIcon className='absolute w-6 h-6 right-3 top-2 hover:cursor-pointer' onClick={onToggleIcon} />
                }
            </div>
        );
    }
);
PasswordInput.displayName = 'PasswordInput';

// #endregion

// #region Input OTP
const InputOTP = React.forwardRef<
    React.ElementRef<typeof OTPInput>,
    React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
    <OTPInput
        ref={ref}
        containerClassName={cn(
            'flex items-center gap-2 has-[:disabled]:opacity-50',
            containerClassName
        )}
        className={cn('disabled:cursor-not-allowed', className)}
        {...props}
    />
));
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef<
    React.ElementRef<'div'>,
    React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center', className)} {...props} />
));
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = React.forwardRef<
    React.ElementRef<'div'>,
    React.ComponentPropsWithoutRef<'div'> & { index: number }
>(({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    return (
        <div
            ref={ref}
            className={cn(
                'relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
                isActive && 'z-10 border border-primary',
                className
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                    <div className='h-4 w-px animate-caret-blink bg-foreground duration-1000' />
                </div>
            )}
        </div>
    );
});
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<
    React.ElementRef<'div'>,
    React.ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
    <div ref={ref} role='separator' {...props}>
        <Dot />
    </div>
));
InputOTPSeparator.displayName = 'InputOTPSeparator';

// #endregion

// #region Input floating label

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return <Input placeholder=' ' className={cn('peer h-[3.125rem] pt-5 px-3 pb-2 rounded-[0.625rem]', className)} ref={ref} {...props} />;
    }
);
FloatingInput.displayName = 'FloatingInput';

const FloatingLabel = React.forwardRef<
    React.ElementRef<typeof Label>,
    React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
    return (
        <Label
            className={cn(
                'text-base leading-4 absolute start-3 top-2 z-10 origin-left scale-75 text-gray-500 duration-300',
                'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100',
                'peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:scale-75',
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
FloatingLabel.displayName = 'FloatingLabel';

type FloatingLabelInputProps = InputProps & { label?: string };

const FloatingLabelInput = React.forwardRef<
    React.ElementRef<typeof FloatingInput>,
    React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, ...props }, ref) => {
    return (
        <div className='relative'>
            <FloatingInput ref={ref} id={id} {...props} />
            <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
        </div>
    );
});
FloatingLabelInput.displayName = 'FloatingLabelInput';

// #endregion

export { Input, PasswordInput, InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, FloatingLabelInput };
