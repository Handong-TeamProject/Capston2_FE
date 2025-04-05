// components/DayPerActivity.tsx
import React from 'react';
import { dayDescription } from '@/data/dayDescription';

interface DayInfo {
    day_status: number;
    activity_status: number;
}

function DayPerActivity({ day, getDayInfo }: { day : number, getDayInfo: DayInfo }) {
    const today = dayDescription[day - 1];
    if (!today) return null;

    return (
        <div className='mb-6'>
            <div className="flex items-start">
                <div className={`text-white text-ls font-bold text-center px-3 py-0.5 rounded-md mr-2
                    ${getDayInfo.day_status >= day ? 'bg-orange' : 'bg-beige' }
                    `}>{day}일차</div>
                <p className="font-bold text-base w-9/12">{today.title}</p>
            </div>
            <div className='mt-2'>
                <p className="text-xs">
                    {today.desc}
                </p>
            </div>
            <div className="flex w-full overflow-x-auto scrollbar-hide py-3 mt-3 pl-2">
                {today.activity.map((activity, index) => (
                    <div 
                        key={index} 
                        className={`w-[250px] h-[150px] flex-shrink-0 rounded-lg px-5 py-3 mr-3 flex flex-col justify-center shadow-md hover:scale-105 active:border object-hover  ${
                            getDayInfo.day_status < day || ( getDayInfo.day_status === day && getDayInfo.activity_status < activity.step)
                                ? ' bg-lightGray' 
                                : (getDayInfo.day_status === day && getDayInfo.activity_status === activity.step) 
                                    ? 'bg-yellow text-white' 
                                    : 'bg-beige90 text-orange'
                        }`}
                    >
                        <p className="text-xs">STEP {activity.step}</p>
                        <p className='font-bold mb-3'>{activity.title}</p>
                        <p className="text-xs">{activity.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DayPerActivity;
