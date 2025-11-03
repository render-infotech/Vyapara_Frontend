import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vendor } from "../../../Type/Vyapara/Admin/Vendors/VendorManangement";

export interface VendorTabState {
  allVendors: Vendor[];
}

const initialState: VendorTabState = {
  allVendors: [],
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
  },
});

// ✅ Exports
export const { setAllVendors, fetchVendors } = VendorTabSlice.actions;
export default VendorTabSlice.reducer;
