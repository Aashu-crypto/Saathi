import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const userPackageSlice = createSlice({
  name: "userPackage",
  initialState,
  reducers: {
    userPackage: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { userPackage } = userPackageSlice.actions;

export default userPackageSlice.reducer;
