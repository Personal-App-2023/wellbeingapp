import { createSlice } from "@reduxjs/toolkit";

export const profile = {};

export const theStore = createSlice({
  name: "theStore",
  initialState: { value: profile },
  reducers: {
    getProfile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getProfile } = theStore.actions;

export default theStore.reducer;