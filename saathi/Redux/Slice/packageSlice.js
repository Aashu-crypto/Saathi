import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  packagesData: [],
};
export const packageSlice = createSlice({
  name: "SubscriptionPackages",
  initialState,
  reducers: {
    subscriptionPackages: (state, action) => {
      state.packagesData = action.payload;
    },
  },
});

export const { subscriptionPackages } = packageSlice.actions;

export default packageSlice.reducer;
