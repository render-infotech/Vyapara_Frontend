import { createSlice } from "@reduxjs/toolkit";
import { VendorBasicFormType } from "../../../Type/Vyapara/Admin/Vendors/VendorBasicForm";

interface VendorEditState {
  numberLevel: number;
  mainVendorLoading: boolean;
  vendor_id: number | null;
  vendorFormValue: VendorBasicFormType | null;
  stepBack: boolean;
}

const initialState: VendorEditState = {
  numberLevel: 1,
  mainVendorLoading: false,
  vendor_id: null,
  vendorFormValue: null,
  stepBack: false,
};

const VendorEditSlice = createSlice({
  name: "vendorEdit",
  initialState,
  reducers: {
    setMainVendorLoading: (state, action) => {
      state.mainVendorLoading = action.payload;
    },
    setVendorFormValue: (state, action) => {
      state.vendorFormValue = action.payload;
    },
    setVendorID: (state, action) => {
      state.vendor_id = action.payload;
    },
    setNumberLevel: (state, action) => {
      state.numberLevel = action.payload;
    },
    handleBackButton: (state) => {
      if (state.numberLevel > 1) {
        state.numberLevel = state.numberLevel - 1;
      }
    },
    setStepBack: (state, action) => {
      state.stepBack = action.payload;
    },
    clearState: (state) => {
      state.numberLevel = 1;
      state.mainVendorLoading = false;
      state.vendor_id = null;
      state.vendorFormValue = null;
      state.stepBack = false;
    },
  },
});

export const {
  setMainVendorLoading,
  setVendorFormValue,
  setVendorID,
  setNumberLevel,
  handleBackButton,
  setStepBack,
  clearState,
} = VendorEditSlice.actions;

export default VendorEditSlice.reducer;
