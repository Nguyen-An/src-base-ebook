import { Button } from '@/components/common/Button';
import { Label } from '@/components/common/Label';

export default function ButtonPage() {
    // variables
    const variantsButton = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
    const sizeButton = ['default', 'sm', 'lg', 'icon'];

    return (
        <div>
            {
                variantsButton.map(vb => (
                    <div key={vb} className='mt-2'>
                        <Label>{vb}</Label>
                        <div className='grid grid-cols-4 gap-4'>
                            {
                                sizeButton.map(size => (
                                    <div className='flex flex-col gap-2' key={size}>
                                        <Button
                                            variant={vb as any}
                                            size={size as any}
                                        >
                                            {size}
                                        </Button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>

    );
}
