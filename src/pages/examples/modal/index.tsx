import { Button } from '@/components/common/Button';
import { useStore } from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';

export default observer(function ModalPage() {
    // store
    const { modalStore: { showAlertModal } } = useStore();

    return (
        <div>
            <Button
                onClick={() => showAlertModal({
                    type: 'error',
                    cancelButton: false,
                    saveButton: false
                })}
            >
                Show modal
            </Button>
        </div>
    );
});
