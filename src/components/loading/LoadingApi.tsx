import { useStore } from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';
import { ThreeCircles } from 'react-loader-spinner';

export default observer(function LoadingApi() {
    // store
    const { apiStore: { isLoading } } = useStore();

    return (
        isLoading ?
            (
                <div className='fixed w-screen h-screen top-0 left-0 z-[9999] bg-[#fdfdfd1e] flex items-center justify-center'>
                    <ThreeCircles
                        width={60}
                        height={60}
                        color=''
                    />
                </div>
            ) :
            <></>
    );
});
