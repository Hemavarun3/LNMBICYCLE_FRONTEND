import React, { useState } from "react";
import loginSignupImage from "../assets/userIcon.png";
import { toast } from "react-hot-toast";
import { loginRedux,logoutRedux } from "../redux/userSlice";
import { BiShow, BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";


const Login = () => {
  const [showPasswordl, setShowPasswordl] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  //const user = useSelector((state)=> state.user);
  const [datal, setDatal] = useState({
    email: "",
    password: "",
  });
  const handleShowPasswordl = () => {
    setShowPasswordl((preve) => !preve);
  };

  const handleOnChangel = (e) => {
    const { name, value } = e.target;
    setDatal((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleLogout = async () => {
    const us=localStorage.getItem("user");
    const user=JSON.parse(us);

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
  const handleSubmitl = async (e) => {
    e.preventDefault();
    const { email, password } = datal;
    const validEmail = (email.endsWith("@lnmiit.ac.in"))

    if (!validEmail) {
      toast("Please enter a valid Gmail address");
      return;
    }
    if (validEmail) {
      if (password) {
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/login`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials : 'include',
          body: JSON.stringify(datal),
        });

        const dataRes = await fetchData.json();
        if (!dataRes.alert) {
          toast(dataRes.message);
          navigate("/login");
        } else {
          toast("Logged in Successfully");
          dispatch(loginRedux(dataRes.data.user));
          let details=dataRes.data.user;
          localStorage.setItem("user", JSON.stringify(details));
          localStorage.setItem("accessToken",JSON.stringify(dataRes.data.accessToken));
          localStorage.setItem("refreshToken",JSON.stringify(dataRes.data.refreshToken));
          setTimeout(handleLogout,dataRes.data.expiry)
          navigate("/");
        }
      } else {
        toast("Please Enter required fields");
      }
    }
  };
  // async function refreshToken() {
  //   console.log("Hello");
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/user/newToken`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ refreshToken: refreshToken }),
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       localStorage.setItem('accessToken', data.accessToken);
  //     } else {
  //       // Handle refresh token failure (e.g., redirect to login)
  //       console.error('Failed to refresh token');
  //     }
  //   } catch (error) {
  //     console.error('Error refreshing token:', error);
  //   }
  // }
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const accessToken = localStorage.getItem('accessToken');
  //     const refresToken = localStorage.getItem('refreshToken');
  //     if (refresToken) {
  //       if (!accessToken) {
  //         console.log("Access token expired or invalid, refreshing...");
  //         await refreshToken();
  //       }
  //     } else {
  //       console.log("No refresh token found, logging out...");
  //       await handleLogout();
  //     }
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);


  return (
    <div className="pt-24">
    
    <div className="p-3 mt-20 md:p-4">
      <div className="w-full max-w-sm bg-maincolor m-auto flex  flex-col p-4 rounded-2xl bg-spotify-dark-gray">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginSignupImage} className="w-full" alt="ima"/>
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmitl}>
            <label htmlFor="email"><span className="text-spotify-green">Email</span></label>
            <input
              type={"email"}
              id="email"
              name="email"
              className="mt-1 mb-2 w-full bg-spotify-dark-gray border border-spotify-green px-2 py-1 rounded focus-within:outline-blue-300"
              value={datal.email}
              onChange={handleOnChangel}
              placeholder="Enter your email"
            />

            <label htmlFor="Password"><span className="text-spotify-green">Password</span></label>
            <div className="flex px-2 py-1 bg-spotify-dark-gray border border-spotify-green rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
              <input
                type={showPasswordl ? "text" : "password"}
                id="password"
                name="password"
                className=" w-full bg-spotify-dark-gray border-none outline-none "
                value={datal.password}
                onChange={handleOnChangel}
                placeholder="Enter password"
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowPasswordl}
              >
                {showPasswordl ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <div className="flex  items-center">
              <button className="w-full max-w-[150px] m-auto bg-spotify-green hover:text-black cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                Login
              </button>
            </div>
          </form>
      </div>
    </div>
    </div>
  );
};

export default Login;