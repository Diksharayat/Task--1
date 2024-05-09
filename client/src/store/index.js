import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authServices";
import { setupListeners } from "@reduxjs/toolkit/query";
import { dashboardApi } from "./services/dashboardServices";



export const store= configureStore({
  reducer:{
  [authApi.reducerPath]: authApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,

},
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(authApi.middleware, dashboardApi.middleware),
  
});



setupListeners(store.dispatch);