import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  email: "",
  name: "",
  rollno: "",
  phoneno : "",
  _id: "",
  isAdmin : ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.phoneno = action.payload.phoneno;
      state.email = action.payload.email;
      state.rollno = action.payload.rollno;
      state.isAdmin = action.payload.isAdmin;
    },
    logoutRedux: (state, action) => {
      state._id = "";
      state.name = "";
      state.phoneno = "";
      state.email = "";
      state.rollno = "";
      state.isAdmin = "";
    },
  },
});

export const { loginRedux ,logoutRedux} = userSlice.actions;

export default userSlice.reducer;
