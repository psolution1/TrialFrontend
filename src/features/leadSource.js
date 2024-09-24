import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { async } from "q";


const apiUrl = process.env.REACT_APP_API_URL;
const DBuUrl = process.env.REACT_APP_DB_URL;
   export const addleadSource=createAsyncThunk("addleadSource",async(data,{rejectWithValue})=>{
           
        const responce=await fetch(`${apiUrl}/add_lead_source/`,{
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


    ///update Lead source api 

    export const EditLeadSourceDetails=createAsyncThunk("EditLeadSourceDetails",async(data,{rejectWithValue})=>{
   const responce=await fetch(`${apiUrl}/update_lead_source/${data._id}`,{
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

   export const getAllLeadSource=createAsyncThunk("getAllLeadSource",async(data,{rejectWithValue})=>{

    const responce=await fetch(`${apiUrl}/all_lead_source`,{
        headers:{       
        "Content-Type":"application/json",
        "mongodb-url":DBuUrl,
       },
     });
    const result=await responce.json();
  
    if(result.success===true){    
        return result;   
   }else{  
    // if(result.message=='Client must be connected before running operations'){
    //     const responce=await fetch(`${apiUrl}/all_lead_source`,{
    //         headers:{       
    //             "Content-Type":"application/json",
    //             "mongodb-url":DBuUrl,
    //            }, 
    //       });
    //     const result=await responce.json();
    //     if(result.success===true){    
    //         return result;   
    //    }
    // }else{
    //     return rejectWithValue(result.message); 
    // }
    return rejectWithValue(result.message);  
   }  
   })

   export const DeleteLeadSource=createAsyncThunk("DeleteLeadSource",async(_id,{rejectWithValue})=>{
        
      const responce=await fetch(`${apiUrl}/delete_lead_source/${_id}`,{
                        method:"DELETE",
                        headers:{     
                            "Content-Type": "application/json",
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










export const leadSource=createSlice({
    name:"leadSource",
    initialState:{
        leadSourcedata:[],
       loading:false,  
       error:null,
       message:'', 
    },
    extraReducers:{
      // create add leadsource
       [addleadSource.pending]:(state) =>{
           state.loading=true; 
       },
       [addleadSource.fulfilled]:(state,action) =>{
           state.loading=false;
              state.leadSourcedata.leadSource.push(action.payload.leadSource); 
          // state.message=action.payload.message; 
       },
       [addleadSource.rejected]:(state,action) =>{
           state.loading=false;
           state.leadSourcedata=action.payload; 
       }, 
       ////////Update Lead Source 
       [EditLeadSourceDetails.pending]:(state)=>{
        state.loading=true; 
       },
       [EditLeadSourceDetails.fulfilled]:(state,action) =>{
        console.log('hfskdjghfj',action.payload)
        state.loading=false;     
        state.leadSourcedata.leadSource=state.leadSourcedata.leadSource.map((ele)=>
                  ele._id===action.payload.leadSource._id?action.payload.leadSource:ele
                );
        },
     [EditLeadSourceDetails.rejected]:(state,action) =>{
      state.loading=false;
      state.message=action.payload.message; 
       }, 






       /// get Alll lead Source
       [getAllLeadSource.pending]:(state) =>{
           state.loading=true; 
       },
       [getAllLeadSource.fulfilled]:(state,action) =>{ 
           state.loading=false;
          state.leadSourcedata=action.payload; 
       },
       [getAllLeadSource.rejected]:(state,action) =>{
           state.loading=false;
           state.leadSourcedata=action.payload; 
       }, 

       ///  DeleteLeadSource
       [DeleteLeadSource.pending]:(state) =>{
        state.loading=true; 
    },
    [DeleteLeadSource.fulfilled]:(state,action) =>{
        state.loading=false;
      const {_id} =action.payload.leadSource; 
         if(_id){
            state.leadSourcedata.leadSource=state.leadSourcedata.leadSource.filter((ele)=>ele._id!==_id);  
       }
     },
    [DeleteLeadSource.rejected]:(state,action) =>{
        state.loading=false;
        state.leadSourcedata=action.payload; 
    }, 


       },
})

export default  leadSource.reducer;