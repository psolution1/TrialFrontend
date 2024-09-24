import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const apiUrl1 = process.env.REACT_APP_LIENCE_URL;
const DBuUrl = process.env.REACT_APP_DB_URL;
// show all data
export const getHostingbydomain=createAsyncThunk("getHostingbydomain",async(host,{rejectWithValue})=>{
    
    const response= await axios.post(`${apiUrl1}/getByDomain`, { domain:host });
   
    try {
         return response?.data?.hosting; 
    } catch (error) { 
          
       return rejectWithValue(error);
    }
})  
   

export const AgentDetail= createAsyncThunk("AgentDetail",async(id,{rejectWithValue})=>{
    const response=await fetch(`${apiUrl}/get_agent_details/${id}`,{
           method:"get", 
          
    });
    const result=await response.json();
           if(result.success===true){
            localStorage.setItem('token',result?.token);
            localStorage.setItem('user_id',result?.agent?._id);
            localStorage.setItem('agent_name',result?.agent?.agent_name);
            localStorage.setItem('agent_email',result?.agent?.agent_email);
            localStorage.setItem('agent_mobile',result?.agent?.agent_mobile);
            localStorage.setItem('role',result?.agent?.role);
            localStorage.setItem('agent_roll',result?.agent?.agent_roll);   
          
            return result;
        }else{  
            return rejectWithValue(result.message);
        } 
    
});

export const login1= createAsyncThunk("login1",async(data,{rejectWithValue})=>{
    const response=await fetch(`${apiUrl}/agent_login`,{
           method:"POST", 
           headers:{    
            "Content-Type":"application/json",
            "mongodb-url":DBuUrl,
           }, 
           body:JSON.stringify(data)
    });
    const result=await response.json();
           if(result.success===true){
            localStorage.setItem('token',result?.token);
            localStorage.setItem('user_id',result?.agent?._id);
            localStorage.setItem('agent_name',result?.agent?.agent_name);
            localStorage.setItem('agent_email',result?.agent?.agent_email);
            localStorage.setItem('agent_mobile',result?.agent?.agent_mobile);
            localStorage.setItem('role',result?.agent?.role);
            localStorage.setItem('agent_roll',result?.agent?.agent_roll);   
          
            return result;
        }else{  
            return rejectWithValue(result.message);
        } 
    
});

export const licenceactive=createAsyncThunk("licenceactive",async(data,{rejectWithValue})=>{
     
    const response=await fetch(`${apiUrl1}/editHosting/${data._id}`,{
           method:"PUT",
           headers:{ 
            "Content-Type":"application/json",
            },
           body:JSON.stringify(data)  
    });
    const result=await response.json();
      //console.log(result);  

      if(result.success===true){
         
        return result;
    }else{  
        return rejectWithValue(result.message);
    }  
    
})






export const allhosting=createSlice({
    name:"hostingDetails",
    initialState:{
       hostings:[],
       agents:[],
       loading:false,  
       error:null,
       message:'', 
    },
    extraReducers:{
      // create hosting
       [getHostingbydomain.pending]:(state) =>{
           state.loading=true; 
       },
       [getHostingbydomain.fulfilled]:(state,action) =>{
           state.loading=false;
           state.hostings.push(action?.payload); 
       },
       [getHostingbydomain.rejected]:(state,action) =>{
           state.loading=false;
           state.hostings=action.payload; 
       }, 
       //// login dashbord 

       [login1.pending]:(state) =>{
        state.loading=true; 
            },
    [login1.fulfilled]:(state,action) =>{
        state.loading=false;
        
        state.agents.push(action.payload.token); 
        state.message=action.payload.message; 
    },
    [login1.rejected]:(state,action) =>{
        state.loading=false;     
        
        state.message=action.payload.message; 
    }, 

    ////inactive to active account 
    [licenceactive.pending]:(state) =>{
        state.loading=true; 
            },
    [licenceactive.fulfilled]:(state,action) =>{
        state.loading=false;
        
      //  state.message=action.payload.message; 
    },
    [licenceactive.rejected]:(state,action) =>{
        state.loading=false;     
        
      //  state.message=action.payload.message; 
    }, 

       },
})

export default  allhosting.reducer;