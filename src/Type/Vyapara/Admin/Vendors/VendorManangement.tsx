import * as Yup from "yup";

export interface Vendor {
  id: number;
  vendor_id: number;
  vendor_code: string;
  business_name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  profile_pic: string;
  phone_country_code: string;
  phone_code: string;
  phone: string;
  address_line: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  is_gst_registered: number; // 0 or 1
  gst_number: string;
  website: string;
  description: string;
  materials: Material[];
  payment_modes: string[];
  working_hours: WorkingHour[];
  rating: string;
  review_count: number | string;
  two_factor_enabled: boolean;
  is_deactivated: number; // 0 or 1
}

export interface Material {
  id: string;
  name: string;
}

export interface WorkingHour {
  id: string;
  day: string; // e.g. "Mon"
  open: string; // "10:00 AM"
  close: string; // "07:00 PM"
  is_closed: number; // 0 or 1
}

export const VendorValidationSchema = Yup.object().shape({
  business_name: Yup.string().required("Business name is required"),

  first_name: Yup.string().required("First name is required"),
  middle_name: Yup.string().nullable(),
  last_name: Yup.string().nullable(),

  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),

  phone_country_code: Yup.string().required("Country code is required"),
  phone_code: Yup.string().required("Phone code is required"),
  phone: Yup.string()
    // .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),

  address_line: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, "Enter valid 6 digit pincode")
    .required("Pincode is required"),

  is_gst_registered: Yup.number().required(
    "GST registration status is required"
  ),
  gst_number: Yup.string().when(
    ["is_gst_registered"],
    ([isRegistered], schema) => {
      return isRegistered === 1
        ? schema.required("GST number is required")
        : // .matches(
          //   /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z])$/,
          //   "Invalid GST number"
          // )
          schema.nullable().notRequired();
    }
  ),

  website: Yup.string()
    .matches(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
      "Invalid website URL"
    )
    .nullable(),
  description: Yup.string().nullable(),

  rating: Yup.string().nullable(),
  review_count: Yup.lazy((val) =>
    typeof val === "number" ? Yup.number() : Yup.string()
  ),
});
