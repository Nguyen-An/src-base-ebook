import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/utils/utils';

interface AvatarProps
    extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    Pick<AvatarPrimitive.AvatarImageProps, 'src' | 'alt'> {
    fallback?: React.ReactNode,
    imageClassName?: AvatarPrimitive.AvatarImageProps['className'],
    fallbackClassName?: AvatarPrimitive.AvatarFallbackProps['className']
}

const Avatar = React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Root>,
    AvatarProps
>(
    (
        {
            fallback,
            imageClassName,
            fallbackClassName,
            className,
            src,
            alt,
            ...props
        },
        ref
    ) => (
        <AvatarPrimitive.Root
            ref={ref}
            className={cn(
                'relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full',
                className
            )}
            {...props}
        >
            <AvatarPrimitive.Image
                src={src}
                alt={alt}
                className={cn('aspect-square h-full w-full', imageClassName)}
            >
            </AvatarPrimitive.Image>
            <AvatarPrimitive.AvatarFallback
                className={cn(
                    'bg-transparent flex h-full w-full items-center justify-center rounded-full',
                    fallbackClassName
                )}
            >
                {fallback}
            </AvatarPrimitive.AvatarFallback>
        </AvatarPrimitive.Root>
    )
);
Avatar.displayName = 'Avatar';

export default Avatar;
