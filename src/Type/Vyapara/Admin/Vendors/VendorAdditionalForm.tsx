import * as Yup from "yup";

export type VendorRegistrationFormPropType = {
  setLoading: (isLoading: boolean) => void;
};

// Material Form Type starts
export interface VendorMaterialFormType {
  materials: string;
}

export const MaterialInitialValue: VendorMaterialFormType = {
  materials: "",
};

export const MaterialValidation = Yup.object().shape({
  materials: Yup.string().required("Material is required"),
});
// Material Form Type ends

// Payment Mode Form Type starts
export interface VendorPaymentModeFormType {
  payment_modes: "";
}

export const PaymentModeInitialValue: VendorPaymentModeFormType = {
  payment_modes: "",
};

export const PaymentModeValidation = Yup.object().shape({
  payment_modes: Yup.string().trim().required("Payment mode is required"),
});

// Payment Mode Form Type ends

// Working Hour Form Type starts
export interface VendorWorkingHour {
  day: string; // "Monday"
  open: string; // "10:00 AM"
  close: string; // "07:00 PM"
  is_closed: string; // "1" or "0"
}

export interface VendorWorkingHourFormType {
  working_hours: VendorWorkingHour[];
}

export const WorkingHourInitialValue: VendorWorkingHourFormType = {
  working_hours: [
    {
      day: "",
      open: "",
      close: "",
      is_closed: "",
    }
  ],
};

export const WorkingHourValidation = Yup.object().shape({
  working_hours: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.string().required("Day is required"),
        open: Yup.string().when("is_closed", {
          is: (val: string) => val === "0",
          then: (schema) => schema.required("Open time is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
        close: Yup.string().when("is_closed", {
          is: (val: string) => val === "0",
          then: (schema) => schema.required("Close time is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
        is_closed: Yup.string()
          .oneOf(["0", "1"], "Must be Yes (1) or No (0)")
          .required("Is Closed is required"),
      })
    )
    .min(1, "At least one working hour entry is required"),
});
// Working Hour Form Type ends

export interface VendorAdditionalFormType
  extends VendorMaterialFormType,
    VendorPaymentModeFormType,
    VendorWorkingHourFormType {}

export const initialVendorAdditionalFormValue: VendorAdditionalFormType = {
  materials: "",
  payment_modes: "",
  working_hours: [],
};

export interface VendorAdditionalFormResponseInterface {
  data: {};
  message: "Success";
  status: 200;
}
