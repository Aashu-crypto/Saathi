import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: 0,
};

export const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    billingStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { billingStatus } = billingSlice.actions; // Export the correct action
export default billingSlice.reducer;
