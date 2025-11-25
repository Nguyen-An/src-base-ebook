import Calendar from '@/components/calendar/Calendar';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function AvatarPage() {
    const [date, setDate] = useState<Date | undefined>();
    const [dates, setDates] = useState<Date[] | undefined>();
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    return (
        <div className='flex gap-4'>
            <div>
                <p className='text-sm font-medium text-muted-foreground mb-1'>Calendar</p>
                <Calendar type='calendar' mode='single' selected={date} onSelect={setDate} required={false} />
            </div>
            <div>
                <div className='flex flex-wrap gap-4'>
                    <div>
                        <p className='text-sm font-medium text-muted-foreground mb-1'>Date Picker Single</p>
                        <Calendar
                            type='datePicker'
                            mode='single'
                            selected={date}
                            onSelect={setDate}
                            required={false}
                        />
                    </div>
                    <div>
                        <p className='text-sm font-medium text-muted-foreground mb-1'>Date Picker Mutiple</p>
                        <Calendar
                            type='datePicker'
                            mode='multiple'
                            selected={dates}
                            onSelect={setDates}
                            required={false}
                            placeholder='Select date multiple'
                        />
                    </div>
                    <div>
                        <p className='text-sm font-medium text-muted-foreground mb-1'>Date Picker Range</p>
                        <Calendar
                            type='datePicker'
                            mode='range'
                            selected={dateRange}
                            onSelect={setDateRange}
                            required={false}
                            placeholder='Select date range'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
