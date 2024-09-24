import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl1 = process.env.REACT_APP_LIENCE_URL;

   export const getAllCountry=createAsyncThunk("getAllCountry",async(data,{rejectWithValue})=>{

    const responce=await fetch(`${apiUrl}/get_all_country`);
    const result=await responce.json();
   
    if(result.success===true){    
        return result;   
   }else{  
       return rejectWithValue(result.message);
   }  
   })












export const countrystate=createSlice({
    name:"CountryState",
    initialState:{
        CountryState:[],
       loading:false,  
       error:null,
       message:'', 
    },
    extraReducers:{
     
       /// get Alll Country
       [getAllCountry.pending]:(state) =>{
           state.loading=true; 
       },
       [getAllCountry.fulfilled]:(state,action) =>{
           state.loading=false;
          state.CountryState=action.payload; 
          
       },
       [getAllCountry.rejected]:(state,action) =>{
           state.loading=false;
           state.CountryState=action.payload; 
       }, 

      
      
       },
})

export default  countrystate.reducer;