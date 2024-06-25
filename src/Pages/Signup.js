import React, { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { toast } from "react-hot-toast";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneno: "",
    rollno: "",
    isAdmin: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleClickc = () => {
    setConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, phoneno, rollno } = data;
    if (name && email && password && confirmPassword && phoneno && rollno) {
      if (password === confirmPassword) {
        console.log(data);
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const dataRes = await fetchData.json();
        alert(dataRes.message);
      } else {
        toast("Password and confirm password do not match.");
      }
    } else {
      toast("Please enter all required fields.");
    }
  };

  return (
    <div className='pt-24'>
    <div className='flex justify-center items-center'>
      <div className='w-4/5 md:w-3/5 rounded-md bg-spotify-dark-gray p-6 mt-10'>
        <div className='flex flex-col md:flex-row md:flex-wrap gap-y-2 md:gap-y-4 md:justify-between font-semibold text-white'>
          <div className='flex flex-col space-y-2 md:w-2/5'>
            <label className='label text-spotify-green'>Name</label>
            <input name='name' value={data.name} onChange={handleChange} className='inp bg-spotify-dark-gray text-white rounded' placeholder='Enter your Full Name' />
          </div>
          <div className='flex flex-col space-y-2 md:w-2/5'>
            <label className='label text-spotify-green'>Email</label>
            <input name='email' value={data.email} onChange={handleChange} className='inp bg-spotify-dark-gray text-white rounded' placeholder='Enter your college email ID' />
          </div>
          <div className='flex flex-col space-y-2 md:w-2/5'>
            <label className='label text-spotify-green'>Phone Number</label>
            <input type='tel' name='phoneno' value={data.phoneno} onChange={handleChange} className='inp bg-spotify-dark-gray text-white rounded' placeholder='Phone number' />
          </div>
          <div className='flex flex-col space-y-2 md:w-2/5'>
            <label className='label text-spotify-green'>Roll Number</label>
            <input name='rollno' value={data.rollno} onChange={handleChange} className='inp bg-spotify-dark-gray text-white rounded' placeholder='Roll Number' />
          </div>
          <div className='flex flex-col space-y-2 w-full md:w-2/5'>
            <label className='label text-spotify-green'>Password</label>
            <div className='flex bg-spotify-dark-gray inp justify-between'>
              <input type={showPassword ? 'text' : 'password'} name='password' value={data.password} onChange={handleChange} className='text-white bg-spotify-dark-gray w-full' placeholder='Password' />
              <button type="button" className='text-2xl text-white' onClick={handleClick}>{showPassword ? <IoIosEyeOff /> : <IoIosEye />}</button>
            </div>
          </div>
          <div className='flex flex-col space-y-2 md:w-2/5'>
            <label className='label text-spotify-green'>Confirm Password</label>
            <div className='flex bg-spotify-dark-gray inp justify-between'>
              <input type={showConfirmPassword ? 'text' : 'password'} name='confirmPassword' value={data.confirmPassword} onChange={handleChange} className='text-white bg-spotify-dark-gray w-full' placeholder='Confirm Password' />
              <button type="button" className='text-2xl text-white' onClick={handleClickc}>{showConfirmPassword ? <IoIosEyeOff /> : <IoIosEye />}</button>
            </div>
          </div>
          <div className='flex flex-col space-y-2 px-4 md:w-full'>
            <div className='flex gap-x-2'>
              <input type="checkbox" name='isAdmin' value={data.isAdmin} onChange={handleChange} className='px-4 py-2' />
              <label className='text-spotify-green  '>Admin</label>
            </div>
          </div>
          <div className='flex justify-center align-middle gap-x-16 md:w-full'>
            <button className='hover:bg-green-600 text-white bg-green-500 px-4 py-2 rounded-xl text-lg flex justify-center' onClick={handleSubmit}>
              <label className='label'>Register</label>
            </button>
          </div>
        </div>
      </div>
      </div>
      </div>
  );
};

export default Form;
