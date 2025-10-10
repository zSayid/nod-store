import { createSlice } from "@reduxjs/toolkit";
import axios from "../service/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchAll",
  async () => {
    const res = await axios.get("/products");
    return res.data;
  }
);

// 🔥 Search uchun
export const searchProducts = createAsyncThunk(
  "product/search",
  async (query) => {
    const res = await axios.get("/products", {
      params: { search: query },
    });
    return res.data;
  }
);

const initialState = {
  isloading: false,
  products: [],
  selectedProduct: null,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Action to set the list of products
    getProductStart: (state, action) => {
      state.isloading = true;
    },

    getProductSuccess: (state, action) => {
      state.isloading = false;
      state.products = action.payload;
      state.status = "succeeded";
    },
    getProductFailure: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
      state.status = "failed";
    },

    // Action to add a new item
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isloading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isloading = false;
      })

      // 🔥 Search reducers
      .addCase(searchProducts.pending, (state) => {
        state.isloading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isloading = false;
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state) => {
        state.isloading = false;
      });
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  addProduct,
  selectProduct,
} = productSlice.actions;
export default productSlice.reducer;
