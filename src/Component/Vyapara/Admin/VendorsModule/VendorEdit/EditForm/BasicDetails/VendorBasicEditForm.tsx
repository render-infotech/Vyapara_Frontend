import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import axiosCall from "../../../../../../../Api/APIcall";
import { toast } from "react-toastify";
import { getSelectedVendorId } from "../../../../../../../utils/IndexedDbVyapara/Vendor/IxDbEditVendor";
import { useAppDispatch, useAppSelector } from "../../../../../../../ReduxToolkit/Hooks";
import { Btn, H6 } from "../../../../../../../AbstractElements";
import { Link } from "react-router-dom";
import { VendorRegistrationFormPropType } from "../../../../../../../Type/Vyapara/Admin/Vendors/VendorBasicForm";
import CommonCardHeader from "../../../../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  parsePhoneNumberFromString,
  getCountryCallingCode,
} from "libphonenumber-js";
import { setNumberLevel } from "../../../../../../../ReduxToolkit/Reducers/Vendors/VendorEditSlice";

const VendorBasicEditForm: React.FC<VendorRegistrationFormPropType> = ({
  setLoading,
}) => {
  const { singleVendorData } = useAppSelector((state) => state.vendorTab);
  const dispatch = useAppDispatch();

  const [files, setFiles] = useState<ExtFile[]>([]);
  const updateFiles = (
    incomingFiles: ExtFile[],
    setFieldValue: (field: string, value: any) => void
  ) => {
    const validPhotos = incomingFiles.filter(
      (file) => file.file && file.file.size <= 5 * 1024 * 1024
    );

    if (validPhotos.length !== incomingFiles.length) {
      toast.error("File size exceeded the maximum size of 5 MB");
    }
    setFiles(validPhotos);
    setFieldValue(
      "profile_pic",
      validPhotos.length > 0 ? validPhotos[0].file : null
    );
  };

  const removeFile = (
    id: string | number | undefined,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const updatedFiles = files.filter((x: ExtFile) => x.id !== id);
    setFiles(updatedFiles);
    setFieldValue(
      "profile_pic",
      updatedFiles.length > 0 ? updatedFiles[0].file ?? null : null
    );
  };

  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    if (!singleVendorData) return;
    // Normalize phone fields for PhoneInput
    const rawCode = (singleVendorData.phone_code || "").toString();
    const rawNum = (singleVendorData.phone || "").toString();
    const rawIso = (singleVendorData.phone_country_code || "").toString();

    // Build full phone value
    const full = rawNum.startsWith("+")
      ? rawNum
      : `${rawCode}${rawNum}`.replace(/\s+/g, "");

    // Try parsing
    const parsed = parsePhoneNumberFromString(full);

    setInitialValues({
      vendor_id: singleVendorData.vendor_id,
      profile_pic: singleVendorData.profile_pic,
      vendor_code: singleVendorData.vendor_code,
      first_name: singleVendorData.first_name,
      last_name: singleVendorData.last_name,
      business_name: singleVendorData.business_name,
      email: singleVendorData.email,
      phone_country_code: parsed?.country || rawIso || "IN",
      phone_code: parsed ? `+${parsed.countryCallingCode}` : rawCode || "+91",
      phone: parsed?.nationalNumber || rawNum, // ✅ store only national number
      address_line: singleVendorData.address_line,
      state: singleVendorData.state,
      pincode: singleVendorData.pincode,
      city: singleVendorData.city,
      country: singleVendorData.country,
      is_gst_registered: singleVendorData.is_gst_registered,
      gst_number: singleVendorData.gst_number,
      website: singleVendorData.website,
      description: singleVendorData.description,
      rating: singleVendorData.rating,
      review_count: singleVendorData.review_count,
    });
  }, [singleVendorData]);

  useEffect(() => {
    const loadSelectedId = async () => {
      const savedId = await getSelectedVendorId();
      if (savedId !== null && savedId !== undefined) {
        setInitialValues((prev: any) =>
          prev ? { ...prev, vendor_id: savedId } : prev
        );
      }
    };
    loadSelectedId();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      // Ensure we have a vendor_id
      let vendorId = values.vendor_id;
      if (!vendorId) {
        vendorId = await getSelectedVendorId();
      }

      // Build multipart form data
      const formData = new FormData();
      formData.append("vendor_id", String(vendorId ?? ""));
      formData.append("first_name", values.first_name ?? "");
      formData.append("last_name", values.last_name ?? "");
      formData.append("business_name", values.business_name ?? "");
      formData.append("email", values.email ?? "");
      formData.append("phone_country_code", values.phone_country_code ?? "");
      formData.append("phone_code", values.phone_code ?? "");
      formData.append("phone", values.phone ?? "");
      formData.append("address_line", values.address_line ?? "");
      formData.append("state", values.state ?? "");
      formData.append("pincode", values.pincode ?? "");
      formData.append("city", values.city ?? "");
      formData.append("country", values.country ?? "");
      formData.append(
        "is_gst_registered",
        String(Number(values.is_gst_registered) || 0)
      );
      formData.append("gst_number", values.gst_number ?? "");
      formData.append("website", values.website ?? "");
      formData.append("description", values.description ?? "");
      formData.append("rating", values.rating ?? "");
      formData.append("review_count", String(Number(values.review_count) || 0));

      // Append profile_pic only if it's a File instance
      const pic = values.profile_pic as any;
      if (pic instanceof File) {
        formData.append("profile_pic", pic);
      }

      const { data } = await axiosCall<{ message: string; status: number }>({
        ENDPOINT: "vendor/update",
        METHOD: "POST",
        PAYLOAD: formData,
        CONFIG: true,
      });

      toast.success(data.message || "Vendor updated successfully");
      dispatch(setNumberLevel(2));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update vendor");
    } finally {
      setLoading(false);
    }
  };

  if (!initialValues) {
    return <p>Loading vendor data...</p>;
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="theme-form">
            <Row className="g-3">
              <Col md="6">
                <Label check>First Name</Label>
                <span className="font-danger">*</span>
                <Field
                  name="first_name"
                  type="text"
                  className={`form-control`}
                />
                <ErrorMessage
                  name="first_name"
                  component="span"
                  className="text-danger"
                />
              </Col>

              <Col md="6">
                <Label check>Last Name</Label>
                <Field
                  name="last_name"
                  type="text"
                  className={`form-control`}
                />
                <ErrorMessage
                  name="last_name"
                  component="span"
                  className="text-danger"
                />
              </Col>

              <Col md="4">
                <Label check>Business Name</Label>
                <span className="font-danger">*</span>
                <Field
                  name="business_name"
                  type="text"
                  className={`form-control`}
                />
                <ErrorMessage
                  name="business_name"
                  component="span"
                  className="text-danger"
                />
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label check>Phone</Label>
                  <span className="font-danger">*</span>

                  <Field name="phone">
                    {({ field, form }: FieldProps) => (
                      <PhoneInput
                        style={{ display: "flex" }}
                        international
                        className="form-control"
                        placeholder="Enter phone number"
                        defaultCountry={
                          (values.phone_country_code as any) || "IN"
                        }
                        value={
                          values.phone_code && values.phone
                            ? `${values.phone_code}${values.phone}`
                            : field.value || ""
                        }
                        onChange={(value) => {
                          if (!value) {
                            form.setFieldValue("phone", "");
                            return;
                          }
                          const parsedPh = parsePhoneNumberFromString(value);
                          if (parsedPh) {
                            form.setFieldValue(
                              "phone",
                              parsedPh.nationalNumber || ""
                            );
                            form.setFieldValue(
                              "phone_country_code",
                              parsedPh.country || (values.phone_country_code as any) || "IN"
                            );
                            form.setFieldValue(
                              "phone_code",
                              `+${parsedPh.countryCallingCode}`
                            );
                          } else {
                            form.setFieldValue(
                              "phone",
                              (value || "").replace(/\D/g, "")
                            );
                          }
                        }}
                        onCountryChange={(country) => {
                          if (!country) return;
                          form.setFieldValue("phone_country_code", country);
                          form.setFieldValue(
                            "phone_code",
                            `+${getCountryCallingCode(country)}`
                          );
                        }}
                      />
                    )}
                  </Field>

                  <ErrorMessage
                    name="phone"
                    component="span"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <Label check>Email</Label>
                <span className="font-danger">*</span>
                <Field name="email" type="text" className={`form-control`} />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-danger"
                />
              </Col>

              <Col md="6">
                <FormGroup>
                  <Label check>Profile Picture</Label>
                  <Dropzone
                    name="profile_pic"
                    onChange={(incomingFiles) =>
                      updateFiles(incomingFiles, setFieldValue)
                    }
                    value={files}
                    maxFiles={1}
                    header={false}
                    footer={false}
                    minHeight="80px"
                    label="Drag'n drop files here or click to Browse"
                  >
                    {files.map((file: ExtFile) => (
                      <FileMosaic
                        key={file.id}
                        {...file}
                        onDelete={() => removeFile(file.id, setFieldValue)}
                        info={true}
                      />
                    ))}
                    {files.length === 0 && (
                      <div className="dz-message needsclick p-5">
                        <i className="icon-cloud-up font-primary"></i>
                        <H6>Click to Upload</H6>
                      </div>
                    )}
                  </Dropzone>
                  <ErrorMessage
                    name="profile_pic"
                    component="span"
                    className="text-danger"
                  />
                </FormGroup>
              </Col>

              <CommonCardHeader
                title="Business Address"
                tagClass={"card-title mb-0"}
                headClass="custom-card-header"
              />
              <>
                <Col md="4">
                  <Label check>Address</Label>
                  <span className="font-danger">*</span>
                  <Field
                    name="address_line"
                    type="text"
                    className={`form-control`}
                  />
                  <ErrorMessage
                    name="address_line"
                    component="span"
                    className="text-danger"
                  />
                </Col>

                <Col md="4">
                  <Label check>City</Label>
                  <span className="font-danger">*</span>
                  <Field name="city" type="text" className={`form-control`} />
                  <ErrorMessage
                    name="city"
                    component="span"
                    className="text-danger"
                  />
                </Col>

                <Col md="4">
                  <Label check>Postal Code</Label>
                  <span className="font-danger">*</span>
                  <Field
                    name="pincode"
                    type="text"
                    className={`form-control`}
                  />
                  <ErrorMessage
                    name="pincode"
                    component="span"
                    className="text-danger"
                  />
                </Col>

                <Col md="3">
                  <Label check>State</Label>
                  <span className="font-danger">*</span>
                  <Field name="state" type="text" className={`form-control`} />
                  <ErrorMessage
                    name="state"
                    component="span"
                    className="text-danger"
                  />
                </Col>

                <Col md="6">
                  <Label check>Country</Label>
                  <span className="font-danger">*</span>
                  <Field
                    name="country"
                    type="text"
                    className={`form-control`}
                  />
                  <ErrorMessage
                    name="country"
                    component="span"
                    className="text-danger"
                  />
                </Col>
              </>

              <CommonCardHeader
                title="GST & Compliance Details"
                tagClass={"card-title mb-0"}
                headClass="custom-card-header"
              />
              <>
                <Col md="4">
                  <Label check>Is GST Registered</Label>
                  <span className="font-danger">*</span>
                  <Field
                    name="is_gst_registered"
                    type="text"
                    className={`form-control`}
                  />
                  <ErrorMessage
                    name="is_gst_registered"
                    component="span"
                    className="text-danger"
                  />
                </Col>

                <Col md="4">
                  <Label check>GST No</Label>
                  <span className="font-danger">*</span>
                  <Field
                    name="gst_number"
                    type="text"
                    className={`form-control`}
                  />
                  <ErrorMessage
                    name="gst_number"
                    component="span"
                    className="text-danger"
                  />
                </Col>
              </>

              <CommonCardHeader
                title="Additional Business Information"
                tagClass={"card-title mb-0"}
                headClass="custom-card-header"
              />
              <>
                <Col md="3">
                  <Label check>Website</Label>
                  <Field
                    name="website"
                    type="text"
                    className={`form-control`}
                  />
                  <ErrorMessage
                    name="website"
                    component="span"
                    className="text-danger"
                  />
                </Col>

                <Col md="3">
                  <Label check>Description</Label>
                  <Field
                    name="description"
                    type="text"
                    className={`form-control`}
                  />
                  <ErrorMessage
                    name="description"
                    component="span"
                    className="text-danger"
                  />
                </Col>

                <Col md="3">
                  <Label check>Rating</Label>
                  <Field name="rating" type="text" className={`form-control`} />
                  <ErrorMessage
                    name="rating"
                    component="span"
                    className="text-danger"
                  />
                </Col>

                <Col md="3">
                  <Label check>Review Count</Label>
                  <Field
                    name="review_count"
                    type="text"
                    className={`form-control`}
                  />
                  <ErrorMessage
                    name="review_count"
                    component="span"
                    className="text-danger"
                  />
                </Col>
              </>

              {/* <Col md="6">
                <Label check>Materials</Label>

                <Field name="materials">
                  {({ form }: any) => {
                    const materialOptions = (
                      singleVendorData?.materials || []
                    ).map((m: any) => ({
                      value: m.id,
                      label: m.name,
                    }));

                    const selectedMaterials = (form.values.materials || []).map(
                      (m: any) => ({
                        value: m.id,
                        label: m.name,
                      })
                    );

                    return (
                      <Select
                        isMulti
                        name="materials"
                        options={materialOptions}
                        value={selectedMaterials}
                        onChange={(selected) => {
                          const formatted = (selected || []).map(
                            (opt: any) => ({
                              id: opt.value,
                              name: opt.label,
                            })
                          );
                          form.setFieldValue("materials", formatted);
                        }}
                        closeMenuOnSelect={false}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select Materials"
                      />
                    );
                  }}
                </Field>

                <ErrorMessage
                  name="materials"
                  component="span"
                  className="text-danger"
                />
              </Col>

              <Col md="6">
                <Label check>Payment Modes</Label>

                <Field name="payment_modes">
                  {({ form }: any) => {
                    // ✅ Build options from vendor's existing payment modes
                    const paymentOptions = (
                      singleVendorData?.payment_modes || []
                    ).map((m: any) => ({
                      value: m,
                      label: m,
                    }));

                    // ✅ Map selected values
                    const selectedOptions = (
                      form.values.payment_modes || []
                    ).map((m: any) => ({
                      value: m,
                      label: m,
                    }));

                    return (
                      <Select
                        isMulti
                        name="payment_modes"
                        options={paymentOptions}
                        value={selectedOptions}
                        onChange={(selected) => {
                          const formatted = selected.map(
                            (opt: any) => opt.value
                          );
                          form.setFieldValue("payment_modes", formatted);
                        }}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select Payment Modes"
                      />
                    );
                  }}
                </Field>

                <ErrorMessage
                  name="payment_modes"
                  component="span"
                  className="text-danger"
                />
              </Col>

              <Col md="12">
                <Label check>Working Hours</Label>

                <Field name="working_hours">
                  {({ form }: any) => {
                    // ✅ Options come from vendor's working_hours
                    const workingHourOptions = (
                      singleVendorData?.working_hours || []
                    ).map((h: any) => ({
                      value: JSON.stringify(h),
                      label: `${h.day} - ${h.open} to ${h.close}`,
                    }));

                    // ✅ Selected values from form (initialValues)
                    const selectedOptions = (
                      form.values.working_hours || []
                    ).map((h: any) => ({
                      value: JSON.stringify(h),
                      label: `${h.day} - ${h.open} to ${h.close}`,
                    }));

                    return (
                      <Select
                        isMulti
                        name="working_hours"
                        options={workingHourOptions}
                        value={selectedOptions}
                        onChange={(selected) => {
                          const formatted = selected.map((opt: any) =>
                            JSON.parse(opt.value)
                          );
                          form.setFieldValue("working_hours", formatted);
                        }}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select Working Hours"
                      />
                    );
                  }}
                </Field>

                <ErrorMessage
                  name="working_hours"
                  component="span"
                  className="text-danger"
                />
              </Col> */}

              <Col
                xs="12"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Btn color="primary" type="submit" className="me-3">
                  Submit
                </Btn>
                <Link to="/vendor-management">
                  <Btn color="danger" className="me-3">
                    Cancel
                  </Btn>
                </Link>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default VendorBasicEditForm;
