import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch} from "react-redux";
import Header from "./components/Header.js";
import { useEffect } from "react";
import { loginRedux } from "./redux/userSlice.js";


function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(loginRedux(foundUser));
    }
  }, [dispatch]);


  
  return (
    <>
    <Toaster />
      <div>
        <Header />
        <main className="" >
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;