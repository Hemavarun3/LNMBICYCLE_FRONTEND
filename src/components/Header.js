import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const handleLogout = async () => {
    const user=userData;
    if (user.email!=='') {
        const fdata = user // Parse JSON string to object
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials : 'include',
                body: JSON.stringify(fdata) // Stringify user object to JSON
            });
            const result = await fetchData.json();
            toast(result.message);
        } catch (error) {
            toast("Failed to logout");
        }
    }

    dispatch(logoutRedux());
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

  return (
    <header className="shadow-md h-24 md:px-32 px-6 fixed z-10 w-full font-semibold bg-maincolor text-white">
      <div className="flex items-center h-full justify-between">
        <Link to={""} className="no-underline">
          <div className="h-10">
            <h3 className="flex text-white text-2xl">
              LNM<span className="text-main2color">BICYCLE</span>
            </h3>
          </div>
        </Link>
        {userData.email && <div className="flex items-center">
          <nav className="text-base md:text-lg hidden md:flex space-x-12">
          <Link to={"/"}  className="text-white no-underline"><p className="hover:text-spotify-green font-semibold">Home</p></Link>
          <Link to={"/booking"} className="text-white no-underline"><p className="hover:text-spotify-green font-semibold">BookNow</p></Link>
          {!userData.isAdmin ? (
            <Link to={"/userBookings"} className="text-white no-underline"><p className="hover:text-spotify-green font-semibold">Bookings</p></Link>
          ) : <Link to={"/adminDashboard"} className="text-white no-underline"><p className="hover:text-spotify-green font-semibold">Dashboard</p></Link>}
          {userData.isAdmin ? (
            <Link to={"/Cycle"} className="text-white no-underline"><p className="hover:text-spotify-green font-semibold">ManageCycles</p></Link>
          ): (
            <Link to={"/contact"} className="text-white no-underline"><p className="hover:text-spotify-green font-semibold">Contact</p></Link>
          )}

          </nav>
        </div>}
        <div className="flex items-center space-x-10">
          <div className="text-2xl relative text-white">
            <Link to={"cart"} style={{ color: "white", textDecoration: "none" }}>
             <i class="fa-solid fa-cart-shopping text-white "></i>
            </Link>
          </div>

          <div className="flex relative gap-4">
            <button className="bg-spotify-green flex space-x-1 rounded-2xl items-center px-2 py-2 text-white" onClick={handleShowMenu} >
                <div className=" text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
                    <HiOutlineUserCircle />
                </div>
              <div className="hidden md:block">
              {userData.email ? (
                <Link to={"/"} className="text-white no-underline" onClick={handleLogout}><p className="hover:text-green-950 font-semibold">Logout</p></Link>
              ) : (
                <Link to={"/login"} className="text-white no-underline"><p className="hover:text-green-950  font-semibold">Login</p></Link>
              )}
              </div>
            </button>

            {!userData.email && <div className="hidden md:block">
              <button className="bg-spotify-green flex space-x-1 rounded-2xl items-center px-2 py-2 text-white">
                <div className=" text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
                    <HiOutlineUserCircle />
                </div>
              <div className="hidden md:block">
                <Link to={"/signup"} className="text-white no-underline"><p className="hover:text-green-950  font-semibold">Sign Up</p></Link>
              </div>
            </button>
            </div>}

            {showMenu && (
              <div  className="right-10 top-10  bg-spotify-green border  py-2 shadow-lg rounded-md w-48  md:hidden mt-2 absolute flex font-semibold" >
                <nav className="text-base md:text-lg flex flex-col px-4 py-2">
                <Link to={"/"}  className="text-white no-underline"><p className="hover:text-red-400 font-semibold">HOME</p></Link>
                {userData.email && <div>
                  <Link to={"/booking"} className="text-white no-underline"><p className="hover:text-red-400 font-semibold">BookNow</p></Link>
                  {!userData.isAdmin ? (
                    <Link to={"/userBookings"} className="text-white no-underline"><p className="hover:text-red-400 font-semibold">Bookings</p></Link>
                    ) : <Link to={"/adminDashboard"} className="text-white no-underline"><p className="hover:text-red-400 font-semibold">Dashboard</p></Link>}
                    {userData.isAdmin ? (
                      <Link to={"/Cycle"} className="text-white no-underline"><p className="hover:text-red-400 font-semibold">ManageCycles</p></Link>
                        ): (
                      <Link to={"/contact"} className="text-white no-underline"><p className="hover:text-red-400 font-semibold">Contact</p></Link>
                    )}
                    {userData.email ? (
                      <Link to={"/"} className="text-white no-underline" onClick={handleLogout}><p className="hover:text-red-400 font-semibold">Logout</p></Link>
                        ) : (
                      <Link to={"/login"} className="text-white no-underline"><p className="hover:text-red-400 font-semibold">Login</p></Link>
                  )}
                  
                </div>}
                {!userData.email && <div>
                  <Link to={"/login"} className="text-white no-underline"><p className="hover:text-red-400 font-semibold">Login</p></Link>
                  <Link to={"/signup"} className="text-white no-underline"><p className="hover:text-red-400 font-semibold">signup</p></Link>
                </div>}
          
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;