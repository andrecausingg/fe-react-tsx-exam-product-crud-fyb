// Redux
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Interface
import { InitialStateAndResponse } from "../../../interface/redux/product/product";

// Define the initial state using that type
const initialState: InitialStateAndResponse = {
  // Query Param Filter
  paramsProducts: {
    limit: 12,
    page: 1,
    search: "",
    start_created_at: "",
    end_created_at: "",
    status: "",
  },
  // Fetch Data
  dataProduct: {
    title_message: "",
    message: "",
    data: [],
    buttons: [],
    filters: [],
    pagination: {},
  },
  // Modal
  isViewModalProduct: false,
  isStoreModalProduct: false,
  isUpdateModalProduct: false,
  isDeleteModalProduct: false,
  // Selected Data
  selectedDataProduct: {
    url: "",
    payload: [],
    method: "",
    icon: "",
    button_name: "",
    container: "",
    details: [],
  },
};

// Slice
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Put data fetch from api
    setDataProduct: (state, action) => {
      state.dataProduct = action.payload;
    },
    // Action to update query parameters with new values
    setParamsProduct: (state, action) => {
      state.paramsProducts = { ...state.paramsProducts, ...action.payload };
    },
    // Modal View
    setViewModalProduct: (state) => {
      state.isViewModalProduct = !state.isViewModalProduct;
    },
    // Modal Store
    setStoreModalProduct: (state) => {
      state.isStoreModalProduct = !state.isStoreModalProduct;
    },
    // Modal Update
    setUpdateModalProduct: (state) => {
      state.isUpdateModalProduct = !state.isUpdateModalProduct;
    },
    // Modal Delete
    setDeleteModalProduct: (state) => {
      state.isDeleteModalProduct = !state.isDeleteModalProduct;
    },
    // Set selected data product
    setSelectedDataProduct: (state, action) => {
      state.selectedDataProduct = action.payload;
    },
  },
});

// Export actions
export const {
  setDataProduct,
  setParamsProduct,
  setViewModalProduct,
  setStoreModalProduct,
  setUpdateModalProduct,
  setDeleteModalProduct,
  setSelectedDataProduct,
} = productSlice.actions;

// State selector
export const selectNameProduct = (state: RootState) => state.product;

// Reducer export
export default productSlice.reducer;
