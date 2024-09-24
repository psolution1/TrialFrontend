import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;



   export const getStatebycountry=createAsyncThunk("getStatebycountry",async(data,{rejectWithValue})=>{
  
    const responce=await fetch(`${apiUrl}/get_state_by_country`,{
        method:"POST", 
        headers:{   
         "Content-Type":"application/json",
        }, 
        body:JSON.stringify({short_name:data})
    });

    const result=await responce.json();
   
    if(result.success===true){    
        return result;   
   }else{  
       return rejectWithValue(result.message);
   }  
   


   })








export const countrystate=createSlice({
    name:"StateByCountry",
    initialState:{
       StateByCountry:[],
       loading:false,  
       error:null,
       message:'', 
    },
    extraReducers:{
     
       /// get state by country

       [getStatebycountry.pending]:(state) =>{
        state.loading=true; 
       },
       [getStatebycountry.fulfilled]:(state,action) =>{
        state.loading=false;
       state.StateByCountry=action.payload; 
       },
       [getStatebycountry.rejected]:(state,action) =>{
        state.loading=false;
        state.StateByCountry=action.payload; 
       },
      
      
       },
})

export default  countrystate.reducer;