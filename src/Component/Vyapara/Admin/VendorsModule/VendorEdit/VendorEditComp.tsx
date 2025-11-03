// import { ErrorMessage, Field, Form, Formik } from "formik";
// import React from "react";
// import { VendorsTabType } from "../../../../../Type/Vyapara/Admin/Vendors/VendorManangement";
// import { Button, Col, Label, Row } from "reactstrap";
// import { Btn } from "../../../../../AbstractElements";

// interface ModalProps {
//   editModalOpen: boolean;
//   editModalToggle: () => void;
//   rowData: VendorsTabType | null;
//   setReload: (loading: boolean) => void;
//   reload: boolean;
// }

// const VendorEditComp: React.FC<ModalProps> = ({
//   editModalOpen,
//   editModalToggle,
//   rowData,
//   setReload,
//   reload,
// }) => {
//   const handleSubmit = async (values: any) => {
//     //
//   };
//   return (
//     <>
//       <Formik
//         initialValues={{
//           vendor_id: rowData?.id || "",
//           profile_pic: rowData?.p_pic || "",
//           vendor_code: rowData?.vendorId || "",
//           fName: rowData?.fName || "",
//           lName: rowData?.lName || "",
//           businessName: rowData?.businessName || "",
//           email: rowData?.mail || "",
//           ph_country_code: rowData?.ph_country_code || "",
//           ph_code: rowData?.ph_code || "",
//           ph_no: rowData?.mobNo || "",
//           addr: rowData?.addr || "",
//           state: rowData?.state || "",
//           pincode: rowData?.pincode || "",
//           city: rowData?.location || "",
//           country: rowData?.country || "",
//           is_gst_registered: rowData?.is_gst_registered ?? "",
//           gst_no: rowData?.gst_no || "",
//           website: rowData?.website || "",
//           desc: rowData?.desc || "",
//           rating: rowData?.rating || "",
//           review_count: rowData?.review_count || "",
//           materials: rowData?.materials?.length
//             ? rowData.materials
//             : [{ id: "", name: "" }],

//           payment_modes: rowData?.payment_modes?.length
//             ? rowData.payment_modes
//             : [""],

//           working_hours: rowData?.working_hours?.length
//             ? rowData.working_hours
//             : [
//                 {
//                   id: "",
//                   day: "",
//                   open: "",
//                   close: "",
//                   is_closed: 0,
//                 },
//               ],
//         }}
//         onSubmit={handleSubmit}
//       >
//         {({ values, setFieldValue }) => (
//           <Form className="theme-form">
//             <Row className="g-3">
//               {/* <Col md="4">
//                     <Label check>Vendor ID</Label>
//                     <span className="font-danger">*</span>
//                     <Field
//                       name="vendor_id"
//                       type="text"
//                       className={`form-control`}
//                     />
//                     <ErrorMessage
//                       name="vendor_id"
//                       component="span"
//                       className="text-danger"
//                     />
//                   </Col> */}

//               {/* <Col md="4">
//                     <Label check>Vendor Code</Label>
//                     <span className="font-danger">*</span>
//                     <Field
//                       name="vendor_code"
//                       type="text"
//                       className={`form-control`}
//                     />
//                     <ErrorMessage
//                       name="vendor_code"
//                       component="span"
//                       className="text-danger"
//                     />
//                   </Col> */}

//               <Col md="4">
//                 <Label check>First Name</Label>
//                 <span className="font-danger">*</span>
//                 <Field name="fName" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="fName"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Last Name</Label>
//                 {/* <span className="font-danger">*</span> */}
//                 <Field name="lName" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="lName"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Business Name</Label>
//                 <span className="font-danger">*</span>
//                 <Field
//                   name="businessName"
//                   type="text"
//                   className={`form-control`}
//                 />
//                 <ErrorMessage
//                   name="businessName"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Email</Label>
//                 <span className="font-danger">*</span>
//                 <Field name="email" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="email"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Phone Country Code</Label>
//                 <span className="font-danger">*</span>
//                 <Field
//                   name="ph_country_code"
//                   type="text"
//                   className={`form-control`}
//                 />
//                 <ErrorMessage
//                   name="ph_country_code"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Phone Code</Label>
//                 <span className="font-danger">*</span>
//                 <Field name="ph_code" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="ph_code"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Mobile No</Label>
//                 <span className="font-danger">*</span>
//                 <Field name="ph_no" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="ph_no"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Address</Label>
//                 <span className="font-danger">*</span>
//                 <Field name="addr" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="addr"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>City</Label>
//                 <span className="font-danger">*</span>
//                 <Field name="city" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="city"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Postal Code</Label>
//                 <span className="font-danger">*</span>
//                 <Field name="pincode" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="pincode"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>State</Label>
//                 <span className="font-danger">*</span>
//                 <Field name="state" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="state"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Country</Label>
//                 <span className="font-danger">*</span>
//                 <Field name="country" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="country"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Is GST Registered</Label>
//                 <span className="font-danger">*</span>
//                 <Field
//                   name="is_gst_registered"
//                   type="text"
//                   className={`form-control`}
//                 />
//                 <ErrorMessage
//                   name="is_gst_registered"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>GST No</Label>
//                 <span className="font-danger">*</span>
//                 <Field name="gst_no" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="gst_no"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Website</Label>
//                 {/* <span className="font-danger">*</span> */}
//                 <Field name="website" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="website"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Description</Label>
//                 {/* <span className="font-danger">*</span> */}
//                 <Field name="desc" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="desc"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Rating</Label>
//                 {/* <span className="font-danger">*</span> */}
//                 <Field name="rating" type="text" className={`form-control`} />
//                 <ErrorMessage
//                   name="rating"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Review Count</Label>
//                 {/* <span className="font-danger">*</span> */}
//                 <Field
//                   name="review_count"
//                   type="text"
//                   className={`form-control`}
//                 />
//                 <ErrorMessage
//                   name="review_count"
//                   component="span"
//                   className="text-danger"
//                 />
//               </Col>

//               <Col md="4">
//                 <Label check>Materials</Label>
//                 <Field
//                   name="materials"
//                   type="text"
//                   className="form-control"
//                   value={values.materials.map((m) => m.name).join(", ")}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                     const newMaterials = e.target.value
//                       .split(",")
//                       .map((m) => ({ id: "", name: m.trim() }))
//                       .filter((m) => m.name !== "");
//                     setFieldValue("materials", newMaterials);
//                   }}
//                 />
//                 <div className="d-flex justify-content-between mt-2">
//                   <Button
//                     color="primary"
//                     size="sm"
//                     type="button"
//                     className="me-2 flex-fill"
//                     onClick={() =>
//                       setFieldValue("materials", [
//                         ...values.materials,
//                         { id: "", name: "New Material" },
//                       ])
//                     }
//                   >
//                     Update
//                   </Button>
//                   <Button
//                     color="danger"
//                     size="sm"
//                     type="button"
//                     className="flex-fill"
//                     onClick={() => setFieldValue("materials", [])}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </Col>

//               <Col md="4">
//                 <Label check>Payment Modes</Label>
//                 <Field
//                   name="payment_modes"
//                   type="text"
//                   className="form-control"
//                   value={values.payment_modes.join(", ")}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                     const newModes = e.target.value
//                       .split(",")
//                       .map((m) => m.trim())
//                       .filter((m) => m !== "");
//                     setFieldValue("payment_modes", newModes);
//                   }}
//                 />
//                 <div className="d-flex justify-content-between mt-2">
//                   <Button
//                     color="primary"
//                     size="sm"
//                     type="button"
//                     className="me-2 flex-fill"
//                     onClick={() =>
//                       setFieldValue("payment_modes", [
//                         ...values.payment_modes,
//                         "New Mode",
//                       ])
//                     }
//                   >
//                     Update
//                   </Button>
//                   <Button
//                     color="danger"
//                     size="sm"
//                     type="button"
//                     className="flex-fill"
//                     onClick={() => setFieldValue("payment_modes", [])}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </Col>

//               <Col md="4">
//                 <Label check>Working Hours</Label>

//                 <Field
//                   name="working_hours"
//                   type="text"
//                   className="form-control"
//                   placeholder="E.g. Monday - 9:00 AM to 6:00 PM, Tuesday - 10:00 AM to 5:00 PM"
//                   value={values.working_hours
//                     .map(
//                       (h) =>
//                         `${h.day || ""} - ${h.open || ""} to ${h.close || ""}`
//                     )
//                     .join(", ")}
//                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                     // Parse comma-separated entries into structured objects
//                     const newHours = e.target.value.split(",").map((item) => {
//                       const [dayPart, timePart] = item
//                         .split("-")
//                         .map((p) => p.trim());
//                       const [open, close] = timePart
//                         ? timePart
//                             .replace("to", "-")
//                             .split("-")
//                             .map((t) => t.trim())
//                         : ["", ""];
//                       return {
//                         day: dayPart || "",
//                         open: open || "",
//                         close: close || "",
//                       };
//                     });
//                     setFieldValue("working_hours", newHours);
//                   }}
//                 />

//                 {/* Buttons below input */}
//                 <div className="d-flex justify-content-between mt-2">
//                   <Button
//                     color="primary"
//                     size="sm"
//                     type="button"
//                     className="me-2 flex-fill"
//                     onClick={() =>
//                       setFieldValue("working_hours", [
//                         ...values.working_hours,
//                         { day: "New Day", open: "00:00", close: "00:00" },
//                       ])
//                     }
//                   >
//                     Update
//                   </Button>
//                   <Button
//                     color="danger"
//                     size="sm"
//                     type="button"
//                     className="flex-fill"
//                     onClick={() => setFieldValue("working_hours", [])}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </Col>

//               <Col
//                 xs="12"
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   alignItems: "center",
//                 }}
//               >
//                 <Btn color="primary" type="submit" className="me-3">
//                   Submit
//                 </Btn>
//                 <Btn
//                   color="primary"
//                   onClick={() => editModalToggle()}
//                   className="me-3"
//                 >
//                   Cancel
//                 </Btn>
//               </Col>
//             </Row>
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default VendorEditComp;
