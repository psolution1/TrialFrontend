import { configureStore } from "@reduxjs/toolkit";
import licence from "../features/licenceSlice";
import leadSource from "../features/leadSource";
import statusSlice from "../features/statusSlice";
import product_serviceSlice from "../features/product_serviceSlice";
import country_stateSlice from "../features/country_stateSlice";
import getStateByCountrySlice from "../features/getStateByCountrySlice"; 
import leadSlice from "../features/leadSlice";
import agentSlice from "../features/agentSlice"; 
import followupSlice from "../features/followupSlice";
import employeesreportSlice from "../features/employeesreportSlice";
import licenceSlice from "../features/licenceSlice";
import lostreasonSlice from "../features/lostreasonSlice";

 export  const store = configureStore({
  reducer: {
      licenceSlice:licenceSlice,
      app:licence,
      leadSource:leadSource,
      StatusData:statusSlice,
      ProductService:product_serviceSlice,
      Country_State:country_stateSlice,
      getStateByCountry:getStateByCountrySlice,
      lead:leadSlice,
      agent:agentSlice,
      followup:followupSlice,
      employeesreportSlice:employeesreportSlice,
      lostreasonSlice:lostreasonSlice
   },
});

export default store;

