import { cn } from '@/utils/utils';
import { Button } from '../common/Button';

interface ModalFooterProps {
    footerClassName?: string,
    cancelButton?: React.ReactNode,
    cancelButtonClassName?: string,
    onCancel?: Function,
    saveButton?: React.ReactNode,
    saveButtonClassName?: string,
    onSave?: Function
}

export default function ModalFooter({
    cancelButton,
    cancelButtonClassName,
    onCancel,
    saveButton,
    saveButtonClassName,
    onSave
}: ModalFooterProps) {
    return (
        <>
            {
                cancelButton && (
                    <Button
                        variant='outline'
                        className={cn('w-32', cancelButtonClassName)}
                        onClick={() => onCancel?.()}
                    >
                        {cancelButton}
                    </Button>
                )
            }
            {
                saveButton && (
                    <Button
                        className={cn('w-32', saveButtonClassName)}
                        onClick={() => onSave?.()}
                    >
                        {saveButton}
                    </Button>
                )
            }
        </>
    );
}
