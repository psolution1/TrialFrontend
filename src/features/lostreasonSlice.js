import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";


const apiUrl = process.env.REACT_APP_API_URL;
const DBuUrl = process.env.REACT_APP_DB_URL; 
/////////add strtus
   export const addLostReason=createAsyncThunk("addLostReason",async(data,{rejectWithValue})=>{
        const responce=await fetch(`${apiUrl}/add_lead_reason/`,{
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

   ///////////// Lostreason Update 
   export const EditLostReason=createAsyncThunk("EditLostReason",async(data,{rejectWithValue})=>{

    const responce=await fetch(`${apiUrl}/update_lead_reason/${data._id}`,{
        method:"PUT",
        headers:{     
            "Content-Type": "application/json",
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
   export const getAllLostReason=createAsyncThunk("getAllLostReason",async(dara,{rejectWithValue})=>{
        
       const resource=await fetch(`${apiUrl}/all_lead_reason/`,{
        headers:{     
            "Content-Type": "application/json",
            "mongodb-url":DBuUrl,
           }, 
       })
       const result=await resource.json();
    if(result.success===true){    
        return result;    
   }else{  
       return rejectWithValue(result.message);
   }  
   })

   ///////delete status 

   export const deleteLostReason=createAsyncThunk("deleteLostReason",async(_id,{rejectWithValue})=>{
         
    const responce=await fetch(`${apiUrl}/delete_lead_reason/${_id}`,{
                      method:"DELETE",
        })

        const  result =await responce.json();
        
        if(result.success===true){     
          return result;    
     }else{  
         return rejectWithValue(result.message);
     }  
 })








export const LostReason=createSlice({
    name:"lostreason",
    initialState:{
        LostReasondata:[],
       loading:false,  
       error:null,
       message:'', 
    },    
    extraReducers:{
      // create add 
       [addLostReason.pending]:(state) =>{
           state.loading=true; 
       },
       [addLostReason.fulfilled]:(state,action) =>{
           state.loading=false;
             
             state.LostReasondata.lostreason.push(action.payload.lostreason);    
         
       },
       [addLostReason.rejected]:(state,action) =>{
           state.loading=false;
           state.LostReasondata=action.payload; 
       }, 

       ////update Lost Reason details 
       [EditLostReason.pending]:(state)=>{
        state.loading=true; 
       },
       [EditLostReason.fulfilled]:(state,action) =>{
         state.loading=false;     
         state.LostReasondata.lostreason=state.LostReasondata?.lostreason.map((ele)=>
                  ele._id===action.payload?.lostreason1._id?action.payload?.lostreason1:ele
                );
       },
      [EditLostReason.rejected]:(state,action) =>{
      state.loading=false;
      state.message=action.payload.message; 
        }, 
       /// get Alll lead Source
       [getAllLostReason.pending]:(state) =>{
        state.loading=true; 
       },
       [getAllLostReason.fulfilled]:(state,action) =>{
        state.loading=false;
        state.LostReasondata=action.payload; 
       // state.message=action.payload.message; 
       },
       [getAllLostReason.rejected]:(state,action) =>{
        state.loading=false;
        state.LostReasondata=action.payload; 
       }, 
   ///  DeleteLeadSource

      [deleteLostReason.pending]:(state) =>{
      state.loading=true; 
      },
        [deleteLostReason.fulfilled]:(state,action) =>{
         state.loading=false;  
          const {_id} =action.payload.lostreason; 
         if(_id){  
             state.LostReasondata.lostreason=state.LostReasondata.lostreason.filter((ele)=>ele._id!==_id);  
         }
       },
      [deleteLostReason.rejected]:(state,action) =>{
      state.loading=false;
      state.LostReasondata=action.payload; 
      }, 
      


       },
})

export default  LostReason.reducer;