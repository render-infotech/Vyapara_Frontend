import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vendor } from "../../../Type/Vyapara/Admin/Vendors/VendorManangement";

export interface VendorTabState {
  allVendors: Vendor[];
  singleVendorData: Vendor | null;
}

const initialState: VendorTabState = {
  allVendors: [],
  singleVendorData: null,
};

const VendorTabSlice = createSlice({
  name: "vendorTab",
  initialState,
  reducers: {
    setAllVendors: (state, action: PayloadAction<Vendor[]>) => {
      state.allVendors = action.payload;
    },

    // ✅ dummy fetch reducer (not API call)
    fetchVendors: (state, action: PayloadAction<Vendor[]>) => {
      state.allVendors = action.payload;
    },

    setSingleVendorData: (state, action: PayloadAction<Vendor | null>) => {
      state.singleVendorData = action.payload;
    },
  },
});

// ✅ Exports
export const { setAllVendors, fetchVendors, setSingleVendorData } = VendorTabSlice.actions;
export default VendorTabSlice.reducer;
