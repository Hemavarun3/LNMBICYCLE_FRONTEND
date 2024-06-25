import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { changeOrder, deleteOrder } from '../redux/orderSlice';

const AdminDashboardComponent = ({ _id, cycleId, startTime, endTime, status, rollno, phoneno, name }, index) => {
   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);

   const handleIssue = () => {
      const deleteo = async () => {
         const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/booking/bookingissue`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id })
         });
         const result = await res.json();
         dispatch(changeOrder({ _id }));
         toast(result.message);
      }
      deleteo();
   };

   const handleDone = () => {
      const deleteo = async () => {
         const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/booking/bookingdone`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id })
         });
         const result = await res.json();
         dispatch(deleteOrder({ _id }));
         toast(result.message);
      }
      deleteo();
   };

   return (
      <div className='bg-spotify-dark-gray text-white font-semibold flex flex-col items-center p-4 rounded-2xl'>
         <div className='flex space-x-4 w-full'>
            <div className='w-1/3'>
               <h1 className='text-spotify-green'>Name</h1>
            </div>
            <div className='w-3/4 items-start'>
               <h1>{name}</h1>
            </div>
         </div>
         <div className='flex space-x-4 w-full'>
            <div className="w-1/3">
               <h1 className='text-spotify-green'>Rollno</h1>
            </div>
            <div className='w-3/4'>
               <h1>{rollno}</h1>
            </div>
         </div>
         <div className='flex space-x-4 w-full'>
            <div className="w-1/3">
               <h1 className='text-spotify-green'>Phone No</h1>
            </div>
            <div className='w-3/4'>
               <span>{phoneno}</span>
            </div>
         </div>
         <div className='flex space-x-4 w-full'>
            <div className='w-1/3'>
               <h1 className='text-spotify-green'>Cycle Id</h1>
            </div>
            <div className='w-3/4 items-start'>
               <h1>{cycleId}</h1>
            </div>
         </div>
         <div className='flex space-x-4 w-full'>
            <div className="w-1/3">
               <h1 className='text-spotify-green'>Start Time</h1>
            </div>
            <div className='w-3/4'>
               <h1>{startTime}</h1>
            </div>
         </div>
         <div className='flex space-x-4 w-full'>
            <div className="w-1/3">
               <h1 className='text-spotify-green'>End Time</h1>
            </div>
            <div className='w-3/4'>
               <span>{endTime}</span>
            </div>
         </div>
         {user.isAdmin && (
            <div className='flex space-x-4 w-full justify-center pt-4'>
               {status === "true" && (
                  <button
                     className='rounded-2xl bg-spotify-green text-black px-4 py-2 w-1/2 hover:bg-spotify-green-hover'
                     onClick={handleDone}
                  >
                     Done
                  </button>
               )}
               {status === "false" && (
                  <button
                     className='rounded-2xl bg-spotify-green text-black px-4 py-2 w-1/2 hover:bg-spotify-green-hover'
                     onClick={handleIssue}
                  >
                     Issue
                  </button>
               )}
            </div>
         )}
      </div>
   );
}

export default AdminDashboardComponent;
