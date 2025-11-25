import { FloatingLabelInput, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { RadioGroup, RadioGroupItem } from '@/components/common/RadioGroup';
import { Switch } from '@/components/common/Switch';
import { Textarea } from '@/components/common/Textarea';

export default function DashboardPage() {
    return (
        <div>
            <div className='flex items-center space-x-2'>
                <Switch id='airplane-mode' />
                <Label htmlFor='airplane-mode'>Airplane Mode</Label>
            </div>
            <div className='mt-5'>
                <Textarea placeholder='Type your message here.' />
            </div>
            <div className='mt-5'>
                <RadioGroup defaultValue='comfortable'>
                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='default' id='r1' />
                        <Label htmlFor='r1'>Default</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='comfortable' id='r2' />
                        <Label htmlFor='r2'>Comfortable</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='compact' id='r3' />
                        <Label htmlFor='r3'>Compact</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className='mt-5'>
                <InputOTP maxLength={6}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <div className='mt-5'>
                <FloatingLabelInput id='floating-demo' label='Phone number' />
            </div>
        </div>
    );
}
