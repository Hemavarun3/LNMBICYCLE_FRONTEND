import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import  orderSlice  from './orderSlice';


export const store = configureStore({
  reducer: {
    user : userSliceReducer,
    orders: orderSlice
  },
});
