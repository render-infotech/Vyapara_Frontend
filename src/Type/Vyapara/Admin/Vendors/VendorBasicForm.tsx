export type VendorRegistrationFormPropType = {
  setLoading: (isLoading: boolean) => void;
};

export interface VendorBasicFormType {
  profile_pic: string;
  first_name: string;
  last_name: string;
  business_name: string;
  email: string;
  phone_country_code: string;
  phone_code: string;
  phone: string;
  address_line: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
  is_gst_registered: number;
  gst_number: string;
  website: string;
  description: string;
  rating: string;
  review_count: string;
}

export const initialVendorBasicFormValue: VendorBasicFormType = {
    profile_pic: "",
    first_name: "",
    last_name: "",
    business_name: "",
    email: "",
    phone_country_code: "",
    phone_code: "",
    phone: "",
    address_line: "",
    state: "",
    pincode: "",
    city: "",
    country: "",
    is_gst_registered: 0,
    gst_number: "",
    website: "",
    description: "",
    rating: "",
    review_count: "",
}

export interface VendorBasicFormResponseInterface {
  data: {
    vendor_id?: number;
  };
  message: string;
  status: number;
}
