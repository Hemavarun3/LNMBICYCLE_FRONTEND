import React from 'react';

const DashboardComponent = ({ cycleId, startTime, endTime, status }, index) => {
    console.log(cycleId, startTime, endTime, status);
    return (
        <div className='bg-spotify-dark-gray text-white font-semibold flex flex-col items-center p-4 rounded-2xl'>
            <div className='flex space-x-4 w-full'>
                <div className='w-1/4'>
                   <h1 className='text-spotify-green'>Cycle Id</h1>
                </div>
                <div className='w-3/4 items-start'>
                   <h1>{cycleId}</h1>
                </div>
            </div>
            <div className='flex space-x-4 w-full'>
                <div className="w-1/4">
                   <h1 className='text-spotify-green'>Start Time</h1>
                </div>
                <div className='w-3/4'>
                   <h1>{startTime}</h1>
                </div>
            </div> 
            <div className='flex space-x-4 w-full'>
                <div className="w-1/4">
                   <h1 className='text-spotify-green'>End Time</h1>
                </div>
                <div className='w-3/4'>
                   <span>{endTime}</span>
                </div>
            </div>
        </div>
    );
}

export default DashboardComponent;
