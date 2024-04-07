import { configureStore } from "@reduxjs/toolkit";
import scrollSlice from "./scrollSlice";
import userSlice from "./userSlice"; 
import walletSlice from "./walletSlice";

const store = configureStore({
  reducer: {
    addContract: walletSlice,
    scroll: scrollSlice,
    userlogin: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;
