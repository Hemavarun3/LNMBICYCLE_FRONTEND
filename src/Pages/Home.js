import React from 'react';
import { Link } from "react-router-dom";
import bicycleImage from '../assets/lnmiit_college.jpeg'; // Adjust the path as necessary

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black bg-opacity-20">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bicycleImage})`, opacity: 0.5 }} />
      <div className="relative z-10 flex flex-col items-start text-white p-10">
        <h1 className="text-5xl font-montserrat font-semibold mb-4 text-center">
          Innovating To Reimagine
        </h1>
        <h1 className="text-5xl font-montserrat font-semibold mb-4 text-center">
          Riding Bicycle
        </h1>
        <p className="mb-4 text-center">
          Phasellus Eget Condimentum Nibh. Nunc Id Enim Id Velit Commodo
          Efficitur. Duis Auctor, Mauris In Maximus Cursus, Purus Neque
          Ultricies.
        </p>
        <p className="mb-8 text-center">
          VelitVivamus A Turpis Nisi. Fusce Feugiat Feugiat Congue In Mauris
          Id Sollicitudin.
        </p>
        <div className='flex gap-x-10'>
          <button className="bg-spotify-green flex space-x-1 rounded-2xl items-center px-2 py-2 text-white">
            <Link to={"/login"} className="text-white no-underline"><p className="hover:text-green-950 w-20 font-semibold">Login</p></Link>
          </button>
          <button className="bg-spotify-green flex space-x-1 rounded-2xl items-center px-2 py-2 text-white">
            <Link to={"/signup"} className="text-white no-underline"><p className="hover:text-green-950 w-20 font-semibold">Signup</p></Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
