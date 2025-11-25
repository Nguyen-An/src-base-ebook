import { Button } from '@/components/common/Button';
import { toastify } from '@/utils/toastify';

export default function ReactToastifyPage() {
    return (
        <div className='flex gap-8'>
            <Button variant='outline' className='w-[150px]' onClick={() => toastify('success', 'Success')}>
                Success
            </Button>
            <Button variant='outline' className='w-[150px]' onClick={() => toastify('error', 'Error')}>
                Error
            </Button>
            <Button variant='outline' className='w-[150px]' onClick={() => toastify('warn', 'Warn')}>
                Warn
            </Button>
            <Button variant='outline' className='w-[150px]' onClick={() => toastify('info', 'Info')}>
                Info
            </Button>
            <Button variant='outline' className='w-[150px]' onClick={() => toastify('custom', 'Custom')}>
                Custom
            </Button>
        </div>
    );
}
