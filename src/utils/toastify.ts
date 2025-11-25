import { Slide, toast, ToastOptions } from 'react-toastify';

type ToastifyType = 'success' | 'error' | 'warn' | 'info' | 'custom';

const toastifyOptionsDefault: ToastOptions = {
    position: 'top-right',
    autoClose: 1000,
    delay: 0,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    transition: Slide
};

export const toastify = (toastifyType: ToastifyType, message: string, toastifyOptions?: ToastOptions) => {
    const toastifyOptionsAll = Object.assign(toastifyOptionsDefault, toastifyOptions);

    switch (toastifyType) {
        case 'success':
            toast.success(message, toastifyOptionsAll);
            break;

        case 'error':
            toast.error(message, toastifyOptionsAll);
            break;

        case 'warn':
            toast.warn(message, toastifyOptionsAll);
            break;

        case 'info':
            toast.info(message, toastifyOptionsAll);
            break;

        default:
            toast(message, toastifyOptionsAll);
            break;
    }
};
