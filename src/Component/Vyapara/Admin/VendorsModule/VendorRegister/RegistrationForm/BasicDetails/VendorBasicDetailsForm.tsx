import { ErrorMessage, FieldProps, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { Btn, H6 } from "../../../../../../../AbstractElements";
import { Link } from "react-router-dom";
import CommonCardHeader from "../../../../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getCountryCallingCode } from "libphonenumber-js";
import {
  VendorBasicFormType,
  VendorBasicFormResponseInterface,
  VendorRegistrationFormPropType,
  initialVendorBasicFormValue,
} from "../../../../../../../Type/Vyapara/Admin/Vendors/VendorBasicForm";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { toast } from "react-toastify";
import { VendorValidationSchema } from "../../../../../../../Type/Vyapara/Admin/Vendors/VendorManangement";
import axiosCall from "../../../../../../../Api/APIcall";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../ReduxToolkit/Hooks";
import {
  setNumberLevel,
  setVendorFormValue,
  setVendorID,
  setStepBack,
} from "../../../../../../../ReduxToolkit/Reducers/Vendors/VendorRegSlice";

const VendorBasicDetailsForm: React.FC<VendorRegistrationFormPropType> = ({
  setLoading,
}) => {
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

  const dispatch = useAppDispatch();
  const numberLevel = useAppSelector((state) => state.vendorReg.numberLevel);

  const handleSubmit = async (
    values: VendorBasicFormType,
    {
      resetForm,
      setFieldValue,
    }: {
      resetForm: () => void;
      setFieldValue: (field: string, value: any) => void;
    }
  ) => {
    console.log("Formik onSubmit triggered with values:", values);
    const parsed = parsePhoneNumber(values.phone || "");

    const localNumber = parsed?.nationalNumber || values.phone || "";
    const country = parsed?.country || values.phone_country_code || "IN";
    const phoneCode = parsed
      ? `+${parsed.countryCallingCode}`
      : values.phone_code || "+91";
    try {
      setLoading(true);

      const formData = new FormData();
      // Use backend-aligned keys directly from values
      formData.append("first_name", values.first_name || "");
      formData.append("last_name", values.last_name || "");
      formData.append("business_name", values.business_name || "");
      formData.append("email", values.email || "");
      formData.append("phone", localNumber);
      formData.append("phone_country_code", country);
      formData.append("phone_code", phoneCode);
      formData.append("address_line", values.address_line || "");
      formData.append("state", values.state || "");
      formData.append("city", values.city || "");
      formData.append("country", values.country || "");
      formData.append("pincode", values.pincode || "");
      formData.append(
        "is_gst_registered",
        String(values.is_gst_registered ?? 0)
      );
      formData.append("gst_number", values.gst_number || "");
      formData.append("website", values.website || "");
      formData.append("description", values.description || "");
      if (values.rating && String(values.rating).trim() !== "") {
        formData.append("rating", values.rating);
      }
      formData.append("review_count", values.review_count || "");

      // Attach file from Dropzone state or value if already set
      const file: File | undefined =
        (files?.[0]?.file as File | undefined) ?? (values as any).profile_pic;
      if (file instanceof File) {
        formData.append("profile_pic", file);
      }

      const response = await axiosCall<VendorBasicFormResponseInterface>({
        ENDPOINT: "vendor/register",
        METHOD: "POST",
        PAYLOAD: formData,
        CONFIG: true,
      });

      const vendor_id = response?.data?.data?.vendor_id;

      dispatch(setVendorID(vendor_id ?? null));
      dispatch(setVendorFormValue(values));
      dispatch(setStepBack(false));
      setTimeout(() => {
        dispatch(setNumberLevel(numberLevel + 1));
        setLoading(false);
      }, 700);

      toast.success(response.data.message || "Vendor created successfully");
      resetForm();
    } catch (error: any) {
      if (
        error.response?.data?.message === "User with this email already exists"
      ) {
        // setExistingEmail(values.email);
        // dispatch(setExistingVendor(true));
        toast.info("Vendor already exists. Please check email.");
      } else if (error.response) {
        const errorMessage =
          error.response.data.message || "Something went wrong";
        toast.error(errorMessage);
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("Server did not respond");
      }
      // Stop loader on error
      setLoading(false);
    } finally {
      // Ensure loader stops in success as well
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialVendorBasicFormValue}
        validationSchema={VendorValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="theme-form">
            <Row className="g-3">
              {/* <CommonCardHeader
                title="Personal & Business Details"
                tagClass={"card-title mb-0"}
                headClass="custom-card-header"
              /> */}
              <>
                <Col md="6">
                  <Label check>First Name</Label>
                  <span className="font-danger">*</span>
                  <Field
                    name="first_name"
                    type="text"
                    className={`form-control`}
                    placeholder="Enter First Name"
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
                    placeholder="Enter Last Name"
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
                    placeholder="Enter Business Name"
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
                          defaultCountry="CA"
                          className="form-control"
                          placeholder="Enter Primary Number"
                          value={form.values.phone || ""}
                          onChange={(value) => {
                            // Let PhoneInput manage its own state, don't parse here
                            form.setFieldValue(field.name, value || "");
                          }}
                          onCountryChange={(country) => {
                            if (country) {
                              form.setFieldValue("phone_country_code", country);
                              form.setFieldValue(
                                "phone_code",
                                `+${getCountryCallingCode(country)}`
                              );
                            }
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
                  <Field
                    name="email"
                    type="text"
                    className={`form-control`}
                    placeholder="Enter Email"
                  />
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

                {/* <Col
                  md="2"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Btn
                    color="primary"
                    className="me-3"
                    {...{ type: "submit" }}
                  >
                    Add
                  </Btn>
                </Col> */}
              </>

              {/* <Col md="4">
                <Label check>Phone Country Code</Label>
                <span className="font-danger">*</span>
                <Field
                  name="ph_country_code"
                  type="text"
                  className={`form-control`}
                  placeholder="Enter Country Code"
                />
                <ErrorMessage
                  name="ph_country_code"
                  component="span"
                  className="text-danger"
                />
              </Col>

              <Col md="4">
                <Label check>Phone Code</Label>
                <span className="font-danger">*</span>
                <Field name="ph_code" type="text" className={`form-control`} placeholder="Enter Phone Code" />
                <ErrorMessage
                  name="ph_code"
                  component="span"
                  className="text-danger"
                />
              </Col>

              <Col md="4">
                <Label check>Phone</Label>
                <span className="font-danger">*</span>
                <Field name="ph_no" type="text" className={`form-control`} placeholder="Enter Phone Number" />
                <ErrorMessage
                  name="ph_no"
                  component="span"
                  className="text-danger"
                />
              </Col> */}

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
                    placeholder="Enter Address"
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
                  <Field
                    name="city"
                    type="text"
                    className={`form-control`}
                    placeholder="Enter City"
                  />
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
                    placeholder="Enter Postal Code"
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
                  <Field
                    name="state"
                    type="text"
                    className={`form-control`}
                    placeholder="Enter State"
                  />
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
                    placeholder="Enter Country"
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

                  <Field name="is_gst_registered">
                    {({ field }: any) => (
                      <select
                        {...field}
                        className="form-control"
                        onChange={(e) => {
                          const val = Number(e.target.value); // convert to number (0 or 1)
                          setFieldValue("is_gst_registered", val);

                          // Clear GST no if user selects NO
                          if (val === 0) {
                            setFieldValue("gst_no", "");
                          }
                        }}
                      >
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </select>
                    )}
                  </Field>

                  <ErrorMessage
                    name="is_gst_registered"
                    component="span"
                    className="text-danger"
                  />
                </Col>

                {values.is_gst_registered === 1 && (
                  <Col md="4">
                    <Label check>GST No</Label>
                    <span className="font-danger">*</span>
                    <Field
                      name="gst_number"
                      type="text"
                      className={`form-control`}
                      placeholder="Enter GST Number"
                    />
                    <ErrorMessage
                      name="gst_number"
                      component="span"
                      className="text-danger"
                    />
                  </Col>
                )}

                <Col md="4"></Col>
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
                    placeholder="Enter Website URL"
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
                    placeholder="Enter Description"
                  />
                  <ErrorMessage
                    name="description"
                    component="span"
                    className="text-danger"
                  />
                </Col>

                <Col md="3">
                  <Label check>Rating</Label>
                  <Field
                    name="rating"
                    type="text"
                    className={`form-control`}
                    placeholder="Enter Rating"
                  />
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
                    placeholder="Enter Review Count"
                  />
                  <ErrorMessage
                    name="review_count"
                    component="span"
                    className="text-danger"
                  />
                </Col>
              </>

              <Col
                xs="12"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Btn color="primary" type="submit" className="me-3">
                  Next
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

export default VendorBasicDetailsForm;
