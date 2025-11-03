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
  day: string;       // e.g. "Mon"
  open: string;      // "10:00 AM"
  close: string;     // "07:00 PM"
  is_closed: number; // 0 or 1
}
