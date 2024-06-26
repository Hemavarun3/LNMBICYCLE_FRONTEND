import React, { useState } from 'react'
import toast from 'react-hot-toast';

function AddNewCycle() {
  const [data,setData]=useState({
    id:"",
    status:""
  });
  const handleChange=(e)=>{
    const {name,value} = e.target;
    setData({
        ...data,
        [name]:value
    })
  }
  const handleSubmitAdd=async ()=>{
    const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/cycle/addCycle`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials : 'include',
        body: JSON.stringify(data),
      });
      const dataRes=await fetchData.json();
      toast(dataRes.message)
  }
  const handleSubmitUpdate=async ()=>{
    const fetchData=await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/cycle/updateCycleStatus`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials : 'include',
        body: JSON.stringify(data),
      });
      const dataRes=await fetchData.json();
      toast(dataRes.message)
  }
  return (
    <div className='pt-24'>
    <div className="mx-10 my-20 max-w-md md:mx-auto p-4 shadow-md shadow-black rounded-lg bg-black">
      <div className="mb-4">
        <label className="block text-spotify-green text-sm font-bold mb-2" htmlFor="id">Id</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-spotify-dark-gray text-white leading-tight focus:outline-none focus:shadow-outline"
          id="id"
          name="id"
          value={data.id}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-spotify-green text-sm font-bold mb-2" htmlFor="status">Status</label>
        <select
          className="shadow appearance-none border rounded bg-spotify-dark-gray w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          id="status"
          name="status"
          value={data.status}
          onChange={handleChange}
        >
          <option value="">---Select---</option>
          <option value="Working">Working</option>
          <option value="Not Working">Not Working</option>
        </select>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-4">
        <button
          className="bg-spotify-green hover:bg-spotify-green-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 sm:mb-0"
          onClick={handleSubmitAdd}
        >
          Add
        </button>
        <button
          className="bg-spotify-green hover:bg-spotify-green-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmitUpdate}
        >
          Update
        </button>
      </div>
    </div>
    </div>
  );
};

export default AddNewCycle;