import React, { useEffect} from 'react';
import { toast } from "react-hot-toast";
import AdminDashboardComponent from '../components/adminDashboardComponent.js';
import { setOrdersPend,setOrdersIssu} from '../redux/orderSlice';
import { useSelector,useDispatch } from 'react-redux';

const AdminDashboard = () => {

    const dispatch=useDispatch();
    /**  pending - false , inuse - true */
    const ordersPend=useSelector((state) => state.orders.ordersPend);
    const ordersIssu=useSelector((state) => state.orders.ordersIssu);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchPendingOrders = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/adminDashboardpending`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        date: new Date().toLocaleDateString()
                    })
                });
                const curr = await res.json();
                dispatch(setOrdersPend(curr.data));
                console.log(curr.data);
            } catch (error) {
                toast.error(error.message || "Failed to fetch pending orders");
            }
        }
        fetchPendingOrders();
        const fetchIssuedOrders = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/adminDashboardissued`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        date: new Date().toLocaleDateString()
                    })
                });
                const curr = await res.json();
                dispatch(setOrdersIssu(curr.data));
                console.log(curr.data);
            } catch (error) {
                toast.error(error.message || "Failed to fetch pending orders");
            }
        }
        fetchIssuedOrders();
    }, [user.rollno,dispatch]);

    return (
        <div className='pt-24'>
        <div className="flex flex-col">
            <div className='text-white flex flex-col md:p-16 p-8'>
                <div className='flex justify-center items-center text-2xl text-spotify-green'>Pending Orders</div>
                <div className='md:py-8 md:px-16 p-12 grid md:grid-cols-3 gap-8'>
                    {ordersPend.length > 0 && (
                        ordersPend.map((e) => (
                            <AdminDashboardComponent key={e._id} _id={e._id} cycleId={e.cycleId} startTime={e.startTime} endTime={e.endTime} status={e.status} name={e.name} rollno={e.rollno} phoneno={e.phoneno} />
                        ))
                    )}
                </div>
            </div>
            <div className='text-white flex flex-col md:p-16 p-8'>
                <div className='flex justify-center items-center text-2xl text-spotify-green'>Issued Orders</div>
                <div className='md:py-8 md:px-16 p-12 grid md:grid-cols-3 gap-8'>
                    {ordersIssu.length > 0 && (
                        ordersIssu.map((e) => (
                            <AdminDashboardComponent key={e._id} _id={e._id} cycleId={e.cycleId} startTime={e.startTime} endTime={e.endTime} status={e.status} name={e.name} rollno={e.rollno} phoneno={e.phoneno} />
                        ))
                    )}
                </div>
            </div>
        </div>
        </div>
    );
}

export default AdminDashboard;
