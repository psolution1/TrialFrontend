import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";


const apiUrl = process.env.REACT_APP_API_URL;
// const apiUrl1 = process.env.REACT_APP_LIENCE_URL;
const DBuUrl = process.env.REACT_APP_DB_URL;


   export const getEmployeeReport=createAsyncThunk("getEmployeeReport",async(data,{rejectWithValue})=>{
           
        const responce=await fetch(`${apiUrl}/get_call_log_by_id_date/`,{
            method:"POST",
            headers:{     
                "Content-Type":"application/json",
                "mongodb-url":DBuUrl,
               }, 
               body:JSON.stringify(data) 
        })  
        const result=await responce.json();
       
      if(result.success===true){  
         
         return result;
    }else{  
        return rejectWithValue(result.message);
    }  
    
   });

   export const getAllFollowup=createAsyncThunk("getAllFollowup",async(_id,{rejectWithValue})=>{
    const responce=await fetch(`${apiUrl}/all_followup_lead_by_id/${_id}`,{
        headers:{     
            "Content-Type":"application/json",
            "mongodb-url":DBuUrl,
           } 
    });
    const result=await responce.json(); 
   
    if(result.success===true){    
        return result;   
   }else{  
       return rejectWithValue(result.message);
   }  
   })

   export const DeleteLeadSource=createAsyncThunk("DeleteLeadSource",async(_id,{rejectWithValue})=>{
        
      const responce=await fetch(`${apiUrl}/delete_lead_source/${_id}`,{
                        method:"DELETE",
                        headers:{     
                            "Content-Type":"application/json",
                            "mongodb-url":DBuUrl,
                           } 
          })

          const  result =await responce.json();

          
        
          if(result.success===true){     
            return result;   
       }else{  
           return rejectWithValue(result.message);
       }  
   })










export const EmployeeReport=createSlice({
    name:"EmployeeReport",
    initialState:{
        EmployeeReport:[],
       loading:false,  
       error:null,
       message:'', 
    },
    extraReducers:{
      // create addfollowup
       [getEmployeeReport.pending]:(state) =>{
           state.loading=true; 
       },
       [getEmployeeReport.fulfilled]:(state,action) =>{
           state.loading=false;
              state.EmployeeReport.unshift(action.payload);  
        
       },
       [getEmployeeReport.rejected]:(state,action) =>{
           state.loading=false;
           state.EmployeeReport=action.payload;  
       }, 
       /// get Alll lead Source


       [getAllFollowup.pending]:(state) =>{
           state.loading=true; 
       },
       [getAllFollowup.fulfilled]:(state,action) =>{
           state.loading=false;
         ///  console.log(action.payload.followuplead)
          state.followup=action.payload; 
          
       },
       [getAllFollowup.rejected]:(state,action) =>{
           state.loading=false;
           state.followup=action.payload; 
       }, 

       ///  DeleteLeadSource


    //    [DeleteLeadSource.pending]:(state) =>{
    //     state.loading=true; 
    //    },
    //    [DeleteLeadSource.fulfilled]:(state,action) =>{
    //     state.loading=false;
    //   const {_id} =action.payload.leadSource; 
    //      if(_id){
    //         state.leadSourcedata.leadSource=state.leadSourcedata.leadSource.filter((ele)=>ele._id!==_id);  
    //    }
    //    },
    //    [DeleteLeadSource.rejected]:(state,action) =>{
    //     state.loading=false;
    //     state.leadSourcedata=action.payload; 
    //    }, 


       },
})

export default  EmployeeReport.reducer;