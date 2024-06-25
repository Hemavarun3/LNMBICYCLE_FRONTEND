import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersPend:[],
  ordersIssu:[]
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersPend : (state,action) => {
        state.ordersPend = [...action.payload];
    },
    setOrdersIssu : (state,action) => {
      state.ordersIssu = [...action.payload];
    },
    changeOrder : (state,action) => {
      const index=state.ordersPend.findIndex((el) => el._id===action.payload._id);
      let x=state.ordersPend[index];
      x.status="true";
      state.ordersIssu = [...state.ordersIssu,state.ordersPend[index]];
      state.ordersPend.splice(index,1);
    },
    deleteOrder : (state,action) => {
      const index=state.ordersIssu.findIndex((el) => el._id===action.payload._id);
      state.ordersIssu.splice(index,1);
    }
  },
});

export const {
  setOrdersPend,
  setOrdersIssu,
  changeOrder,
  deleteOrder
} = orderSlice.actions;

export default orderSlice.reducer;
