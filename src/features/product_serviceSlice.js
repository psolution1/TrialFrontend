import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_API_URL;
const DBuUrl = process.env.REACT_APP_DB_URL;
/////////add strtus
export const addProductService = createAsyncThunk(
  "addProductService",
  async (data, { rejectWithValue }) => {
    const responce = await fetch(`${apiUrl}/add_product_service/`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
          "mongodb-url":DBuUrl,
      },
      body: JSON.stringify(data),
    });
    const result = await responce.json();

    if (result.success === true) {
      return result;
    } else {
      return rejectWithValue(result.message);
    }
  }
);
//////// update
export const UpdateProductService = createAsyncThunk(
  "UpdateProductService",
  async (data, { rejectWithValue }) => {
    const responce = await fetch(
      `${apiUrl}/update_product_service/${data?._id}`,
      {
        method: "put",
          headers:{
            "Content-Type": "application/json",
              "mongodb-url":DBuUrl,
          },
      body: JSON.stringify(data),
      }
    );
    const result = await responce.json();
 
    if (result.success === true) {
      return result;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

////////get app status
export const getAllProductService = createAsyncThunk(
  "getAllProductService",
  async (dara, { rejectWithValue }) => {
    const resource = await fetch(
      `${apiUrl}/all_product_service/`,{
        headers:{     
          "Content-Type":"application/json",
           "mongodb-url":DBuUrl,
         }, 
      }
    );
    const result = await resource.json();
    if (result.success === true) {
      return result;
    } else {
      if(result.message=='Client must be connected before running operations'){
        const responce=await fetch(`${apiUrl}/all_product_service`,{
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
      // return rejectWithValue(result.message);
    }
  }
);

/////// deleteProduct_service

export const deleteProductService = createAsyncThunk(
  "deleteProductService",
  async (_id, { rejectWithValue }) => {
    const responce = await fetch(
      `${apiUrl}/delete_product_service/${_id}`,
      {
        method: "DELETE",
        headers:{
          "Content-Type": "application/json",
            "mongodb-url":DBuUrl,
        }
      }
    );

    const result = await responce.json();

    if (result.success === true) {
      return result;
    } else {
      return rejectWithValue(result.message);
    }
  }
);

export const productservice = createSlice({
  name: "productservice",
  initialState: {
    ProductService: [],
    loading: false,
    error: null,
    message: "",
  },
  extraReducers: {
    // create add Product Service
    [addProductService.pending]: (state) => {
      state.loading = true;
    },
    [addProductService.fulfilled]: (state, action) => {
      state.loading = false;
      //console.log(action.payload)
      state.ProductService.product_service.push(action.payload.product_service);
    },
    [addProductService.rejected]: (state, action) => {
      state.loading = false;
      state.ProductService = action.payload;
    },
    //////update Api 
    [UpdateProductService.pending]: (state) => {
      state.loading = true;
    },
    [UpdateProductService.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action.payload',action.payload); 
      state.ProductService.product_service=state.ProductService.product_service.map((ele)=>
      ele._id===action.payload.product_service._id?action.payload.product_service:ele
   );
    },
    [UpdateProductService.rejected]: (state, action) => {
      state.loading = false;
      state.ProductService = action.payload;
    },


    /// get all product and service
    [getAllProductService.pending]: (state) => {
      state.loading = true;
    },
    [getAllProductService.fulfilled]: (state, action) => {
      state.loading = false;
      state.ProductService = action.payload;
    },
    [getAllProductService.rejected]: (state, action) => {
      state.loading = false;
      state.ProductService = action.payload;
    },

    //// deleteProduct_service
    [deleteProductService.pending]: (state) => {
      state.loading = true;
    },
    [deleteProductService.fulfilled]: (state, action) => {
      state.loading = false;
      const { _id } = action.payload.product_service;
      if (_id) {
        state.ProductService.product_service =
          state.ProductService.product_service.filter((ele) => ele._id !== _id);
      }
    },
  },
});

export default productservice.reducer;
