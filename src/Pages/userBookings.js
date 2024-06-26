import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import DashboardComponent from '../components/dashboardComponent.js';
import { useSelector } from 'react-redux';

const UserBookings = () => {


     /**  pending - false , inuse - true */
    const [ordersPend, setOrdersPend] = useState([]);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchPendingOrders = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/userBookings`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    credentials : 'include',
                    body: JSON.stringify({
                        rollno: user.rollno
                    })
                });
                const curr = await res.json();
                setOrdersPend(curr.data);
            } catch (error) {
                toast.error(error.message || "Failed to fetch pending orders");
            }
        }
        fetchPendingOrders();
    }, [user.rollno]);

    return (
        <div className='pt-24'>
        <div className='text-main2color flex flex-col md:p-16 p-8'>
            <div>Pending Orders</div>
            <div className='md:py-8 md:px-16 p-12 grid md:grid-cols-3 gap-8'>
                {ordersPend.length > 0 && (
                    ordersPend.map((e) => (
                        <DashboardComponent key={e._id} cycleId={e.cycleId} startTime={e.startTime} endTime={e.endTime}  status={e.status} />
                    ))
                )}
            </div>
        </div>
        </div>
    );
}

export default UserBookings;
