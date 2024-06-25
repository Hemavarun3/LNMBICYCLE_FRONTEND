import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import Home from "./Pages/Home.js";
import Signup from "./Pages/Signup.js";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import Booking from "./Pages/Booking.js";
import UserBookings from './Pages/userBookings.js';
import AddNewCycle from "./Pages/AddNewCycle.js";
import AdminDashboard from "./Pages/adminDashboard.js";
import ContactUs from "./Pages/ContactUs.js";
import Login from "./Pages/Login.js";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="booking" element={<Booking />} />
      <Route path="userBookings" element={<UserBookings />} />
      <Route path="Cycle" element={<AddNewCycle />} />
      <Route path="adminDashboard" element={<AdminDashboard />} />
      <Route path="contact" element={<ContactUs />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);


