import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [highlight, setHighlight] = useState('today');
  const [error, setError] = useState('');
  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 10);
    const startDateTime = startTime;
    const endDateTime = endTime;

    if (startDateTime < currentTime) {
      setError('Start time must be at least 10 minutes from the current time.');
      return;
    }

    if (endDateTime <= startDateTime) {
      setError('End time must be later than the start time.');
      return;
    }

    setError('');
    const date = selectedDate;

// Extract the day, month, and year
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();

// Pad single digit day and month with leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

// Create the formatted date string
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
    const obj = {
      name: user.name,
      rollno: user.rollno,
      phoneno: user.phoneno,
      startTime: startTime,
      endTime: endTime,
      date: formattedDate,
    };

    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/booking/findCycle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials : 'include',
      body: JSON.stringify(obj),
    });

    const result = await fetchData.json();
    toast(result.message);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
    setHighlight('today');
  };

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow);
    setHighlight('tomorrow');
  };

  return (
    <div className='pt-24'>
    <div className="max-w-md mx-auto mt-10 p-6 bg-spotify-dark-gray rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-spotify-green mb-4">Cycle Booking</h1>
    <div className="flex mb-4">
      <button
        className={`flex-1 p-2 rounded-l-md ${
          highlight === 'today' ? 'bg-spotify-green text-black' : 'bg-gray-800 text-gray-300'
        }`}
        onClick={handleToday}
      >
        Today
      </button>
      <button
        className={`flex-1 p-2 rounded-r-md ${
          highlight === 'tomorrow' ? 'bg-spotify-green text-black' : 'bg-gray-800 text-gray-300'
        }`}
        onClick={handleTomorrow}
      >
        Tomorrow
      </button>
    </div>
    <form onSubmit={handleSubmit}>
      {error && <div className="mb-4 text-spotify-green">{error}</div>}
      <div className="mb-4">
        <label className="block text-spotify-green" htmlFor="bookingDate">Booking Date:</label>
        <input
          className="mt-1 block w-full p-2 border border-spotify-green rounded-md bg-spotify-dark-gray text-white"
          id="bookingDate"
          type="text"
          value={selectedDate.toLocaleDateString()}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block text-spotify-green" htmlFor="startTime">Start Time:</label>
        <input
          className="mt-1 block w-full p-2 border border-spotify-green rounded-md bg-spotify-dark-gray text-white"
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-spotify-green" htmlFor="endTime">End Time:</label>
        <input
          className="mt-1 block w-full p-2 border border-spotify-green rounded-md bg-spotify-dark-gray text-white"
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <button
        className="w-full bg-spotify-green hover:bg-spotify-green-hover text-black font-bold py-2 px-4 rounded"
        type="submit"
      >
        Book Cycle
      </button>
    </form>
  </div>
    </div>
  );
};

export default Booking;
    