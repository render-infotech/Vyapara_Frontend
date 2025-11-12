import React from "react";
import CommonModal from "../../../../../Ui-Kits/Modal/Common/CommonModal";
import { Vendor } from "../../../../../../Type/Vyapara/Admin/Vendors/VendorManangement";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { Btn } from "../../../../../../AbstractElements";

interface ModalProps {
  viewModalOpen: boolean;
  viewModalToggle: () => void;
  rowData: Vendor | null;
}

const ViewModal: React.FC<ModalProps> = ({
  viewModalOpen,
  viewModalToggle,
  rowData,
}) => {
  const handleSubmit = () => {
    viewModalToggle();
  };
  return (
    <CommonModal
      size="lg"
      centered
      sizeTitle={rowData?.business_name}
      modalBodyClassName="tableModal"
      isOpen={viewModalOpen}
      toggle={viewModalToggle}
    >
      {rowData ? (
        <div className="modal-toggle-wrapper">
          <Formik
            initialValues={{
              id: rowData?.id || 0,
              vendor_id: rowData?.vendor_id || 0,
              vendor_code: rowData?.vendor_code || "",
              business_name: rowData?.business_name || "",
              first_name: rowData?.first_name || "",
              middle_name: rowData?.middle_name || "",
              last_name: rowData?.last_name || "",
              email: rowData?.email || "",
              profile_pic: rowData?.profile_pic || "",
              phone_country_code: rowData?.phone_country_code || "",
              phone_code: rowData?.phone_code || "",
              phone: rowData?.phone || "",
              address_line: rowData?.address_line || "",
              country: rowData?.country || "",
              state: rowData?.state || "",
              city: rowData?.city || "",
              pincode: rowData?.pincode || "",
              is_gst_registered: rowData?.is_gst_registered || 0,
              gst_number: rowData?.gst_number || "",
              website: rowData?.website || "",
              description: rowData?.description || "",
              materials: rowData?.materials || [],
              payment_modes: rowData?.payment_modes || [],
              working_hours: rowData?.working_hours || [],
              rating: rowData?.rating || "",
              review_count: rowData?.review_count || 0,
            }}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="theme-form">
                <Row className="g-2">
                  <Col md="12" className="text-center mb-3">
                    <img
                      src={rowData?.profile_pic || "/default-profile.png"}
                      alt="Profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        display: "block",
                        margin: "0 auto", // ✅ centers it
                        // border: "2px solid #ddd",
                        padding: "3px",
                      }}
                    />
                  </Col>

                  {/* Basic Information */}
                  {/* <Col md="4">
                    <FormGroup>
                      <Label check>Vendor ID</Label>
                      <Field
                        disabled
                        name="vendor_id"
                        className="form-control"
                        type="number"
                      />
                    </FormGroup>
                  </Col> */}
                  <Col md="4">
                    <FormGroup>
                      <Label check>Vendor Code</Label>
                      <Field
                        disabled
                        name="vendor_code"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                    <ErrorMessage
                      name="vendor_code"
                      component="span"
                      className="text-danger"
                    />
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label check>Business Name</Label>
                      <Field
                        disabled
                        name="business_name"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                    <ErrorMessage
                      name="business_name"
                      component="span"
                      className="text-danger"
                    />
                  </Col>

                  {/* Personal Information */}
                  <Col md="4">
                    <FormGroup>
                      <Label check>First Name</Label>
                      <Field
                        disabled
                        name="first_name"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                    <ErrorMessage
                      name="first_name"
                      component="span"
                      className="text-danger"
                    />
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label check>Last Name</Label>
                      <Field
                        disabled
                        name="last_name"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                    <ErrorMessage
                      name="last_name"
                      component="span"
                      className="text-danger"
                    />
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label check>Email</Label>
                      <Field
                        disabled
                        name="email"
                        className="form-control"
                        type="email"
                      />
                    </FormGroup>
                  </Col>

                  {/* Contact Information */}
                  <Col md="4">
                    <FormGroup>
                      <Label check>Phone Country Code</Label>
                      <Field
                        disabled
                        name="phone_country_code"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label check>Phone Code</Label>
                      <Field
                        disabled
                        name="phone_code"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label check>Phone</Label>
                      <Field
                        disabled
                        name="phone"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                  {/* Address Information */}
                  <Col md="4">
                    <FormGroup>
                      <Label check>Address Line</Label>
                      <Field
                        disabled
                        name="address_line"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label check>Country</Label>
                      <Field
                        disabled
                        name="country"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label check>State</Label>
                      <Field
                        disabled
                        name="state"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label check>City</Label>
                      <Field
                        disabled
                        name="city"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label check>Pincode</Label>
                      <Field
                        disabled
                        name="pincode"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                  {/* Business Information */}
                  <Col md="4">
                    <FormGroup>
                      <Label check>Is GST Registered</Label>
                      <Field
                        disabled
                        name="is_gst_registered"
                        className="form-control"
                        component="select"
                      >
                        <option value={0}>No</option>
                        <option value={1}>Yes</option>
                      </Field>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label check>GST Number</Label>
                      <Field
                        disabled
                        name="gst_number"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label check>Website</Label>
                      <Field
                        disabled
                        name="website"
                        className="form-control"
                        type="url"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label check>Description</Label>
                      <Field
                        disabled
                        type="text"
                        name="description"
                        className="form-control"
                        rows="3"
                      />
                    </FormGroup>
                  </Col>

                  {/* Materials */}
                  <Col md="12">
                    <FormGroup>
                      <Label check>Materials</Label>
                      <textarea
                        disabled
                        className="form-control"
                        rows={2}
                        value={
                          Array.isArray(values.materials)
                            ? values.materials
                                .map((m: any) =>
                                  typeof m === "string"
                                    ? m
                                    : typeof m?.name === "object"
                                    ? m?.name?.name ?? ""
                                    : m?.name ?? ""
                                )
                                .filter(Boolean)
                                .join(", ")
                            : ""
                        }
                        readOnly
                        style={{ resize: "none" }}
                      />
                    </FormGroup>
                  </Col>

                  {/* Payment Modes */}
                  <Col md="12">
                    <FormGroup>
                      <Label check>Payment Modes</Label>
                      <textarea
                        disabled
                        className="form-control"
                        rows={2}
                        value={(values.payment_modes || [])
                          .map((p: any) =>
                            typeof p === "string"
                              ? p
                              : p?.mode ?? p?.name ?? p?.label ?? ""
                          )
                          .filter((x: string) => x && x.length > 0)
                          .join(", ")}
                        readOnly
                        style={{ resize: "none" }}
                      />
                    </FormGroup>
                  </Col>

                  {/* Working Hours */}
                  <Col md="12">
                    <FormGroup>
                      <Label check>Working Hours</Label>
                      <textarea
                        disabled
                        className="form-control"
                        rows={2}
                        value={
                          values.working_hours
                            ?.map(
                              (wh: any) =>
                                `${wh.day}: ${
                                  wh.is_closed
                                    ? "Closed"
                                    : `${wh.open} - ${wh.close}`
                                }`
                            )
                            .join("\n") || ""
                        }
                        readOnly
                        style={{ resize: "none" }}
                      />
                    </FormGroup>
                  </Col>

                  {/* Ratings and Stats */}
                  <Col md="4">
                    <FormGroup>
                      <Label check>Rating</Label>
                      <Field
                        disabled
                        name="rating"
                        className="form-control"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label check>Review Count</Label>
                      <Field
                        disabled
                        name="review_count"
                        className="form-control"
                        type="number"
                      />
                    </FormGroup>
                  </Col>

                  <Col xs="12">
                    <Btn color="tertiary" type="submit">
                      Close
                    </Btn>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </CommonModal>
  );
};

export default ViewModal;
