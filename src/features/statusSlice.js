import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;
const DBuUrl = process.env.REACT_APP_DB_URL;

/////////add strtus
   export const addStatus=createAsyncThunk("addStatus",async(data,{rejectWithValue})=>{
           
        const responce=await fetch(`${apiUrl}/add_lead_status/`,{
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


   ///update agent api 

   export const EditStatusDetails=createAsyncThunk("EditAgentDetails",async(data,{rejectWithValue})=>{

    const responce=await fetch(`${apiUrl}/update_lead_status/${data._id}`,{
        method:"PUT",
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
   })


   ////////get app status 
   export const getAllStatus=createAsyncThunk("getAllStatus",async(dara,{rejectWithValue})=>{
        
       const resource=await fetch(`${apiUrl}/all_lead_status/`,{
        headers: {
            "Content-Type": "application/json",
            "mongodb-url":DBuUrl,
          },
       })
       const result=await resource.json();
    if(result.success===true){    
        return result;    
   }else{ 
    if(result.message=='Client must be connected before running operations'){
    const responce=await fetch(`${apiUrl}/all_lead_status`,{
        headers:{       
            "Content-Type":"application/json",
            "mongodb-url":DBuUrl,
           }, 
      });
    const result=await responce.json();
    if(result.success===true){    
        return result;   
   }
}else{
    return rejectWithValue(result.message); 
} 
   
   }  
   })

   ///////delete status 

   export const deleteStatus=createAsyncThunk("deleteStatus",async(_id,{rejectWithValue})=>{
         
    const responce=await fetch(`${apiUrl}/delete_lead_status/${_id}`,{
                      method:"DELETE",
                      headers:{     
                        "Content-Type":"application/json",
                        "mongodb-url":DBuUrl,
                       }, 
        })

        const  result =await responce.json();
        
        if(result.success===true){     
          return result;    
     }else{  
         return rejectWithValue(result.message);
     }  
 })








export const leadStatus=createSlice({
    name:"status",
    initialState:{
        Statusdata:[],
       loading:false,  
       error:null,
       message:'', 
    },    
    extraReducers:{
      // create add 
       [addStatus.pending]:(state) =>{
           state.loading=true; 
       },
       [addStatus.fulfilled]:(state,action) =>{
           state.loading=false;
            state.Statusdata.leadstatus.push(action.payload.leadstatus);    
        },
       [addStatus.rejected]:(state,action) =>{
           state.loading=false;
           state.Statusdata=action.payload; 
       }, 
       
        ////update Status details 
        [EditStatusDetails.pending]:(state)=>{
            state.loading=true; 
           },
           [EditStatusDetails.fulfilled]:(state,action) =>{
            state.loading=false;     
           console.log('action.payload._id',action?.payload?.leadstatus1?._id)
            state.Statusdata.leadstatus=state.Statusdata.leadstatus.map((ele)=>
                      ele._id===action?.payload?.leadstatus1?._id?action.payload?.leadstatus1:ele
                    );
          },
         [EditStatusDetails.rejected]:(state,action) =>{
          state.loading=false;
            state.message=action.payload.message; 
         }, 


       /// get Alll lead Source
       [getAllStatus.pending]:(state) =>{
        state.loading=true; 
       },
       [getAllStatus.fulfilled]:(state,action) =>{
        state.loading=false;
        state.Statusdata=action.payload; 
       // state.message=action.payload.message; 
       },
       [getAllStatus.rejected]:(state,action) =>{
        state.loading=false;
        state.Statusdata=action.payload; 
       }, 
   ///  DeleteLeadSource

      [deleteStatus.pending]:(state) =>{
      state.loading=true; 
      },
        [deleteStatus.fulfilled]:(state,action) =>{
         state.loading=false;
          const {_id} =action.payload.leadstatus; 
         if(_id){  
             state.Statusdata.leadstatus=state.Statusdata.leadstatus.filter((ele)=>ele._id!==_id);  
         }
       },
      [deleteStatus.rejected]:(state,action) =>{
      state.loading=false;
      state.Statusdata=action.payload; 
      }, 

       },
})

export default  leadStatus.reducer;