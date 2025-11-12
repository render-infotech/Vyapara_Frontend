import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { Btn } from "../../../../../../../AbstractElements";
import { Link, useNavigate } from "react-router-dom";
import {
  initialVendorAdditionalFormValue,
  VendorRegistrationFormPropType,
} from "../../../../../../../Type/Vyapara/Admin/Vendors/VendorAdditionalForm";
import Materials from "./Materials/Materials";
import PaymentModes from "./PaymentModes/PaymentModes";
import WorkingHours from "./WorkingHours/WorkingHours";
import MaterialsModal from "./Materials/MaterialsModal";
import PaymentModesModal from "./PaymentModes/PaymentModesModal";
import WorkingHoursModal from "./WorkingHours/WorkingHoursModal";
import axiosCall from "../../../../../../../Api/APIcall";
import { toast } from "react-toastify";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../ReduxToolkit/Hooks";
import {
  handleBackButton,
} from "../../../../../../../ReduxToolkit/Reducers/Vendors/VendorRegSlice";

const VendorAdditionalInfoForm: React.FC<VendorRegistrationFormPropType> = ({
  setLoading,
}) => {
  //Modal for adding new materials
  const [newMaterialsModal, setNewMaterialsModal] = useState(false);
  const newMaterialsModalToggle = () => {
    setNewMaterialsModal((prev) => !prev);
  };

  //Modal for adding new payment modes
  const [newPaymentModeModal, setNewPaymentModeModal] = useState(false);
  const newPaymentModeModalToggle = () => {
    setNewPaymentModeModal((prev) => !prev);
  };

  //Modal for adding new working hours
  const [newWorkingHoursModal, setNewWorkingHoursModal] = useState(false);
  const newWorkingHoursModalToggle = () => {
    setNewWorkingHoursModal((prev) => !prev);
  };
  const vendor_id = useAppSelector((state) => state.vendorReg.vendor_id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
//   const numberLevel = useAppSelector((state) => state.vendorReg.numberLevel);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const handleSubmit = async (values: any) => {
    if (!vendor_id) {
      toast.error("Vendor ID not found. Please complete the basic form first.");
      return;
    }

    try {
      setLoading(true);

      const materials: string[] = Array.isArray(values.materials)
        ? values.materials
            .map((m: any) =>
              typeof m === "string"
                ? m
                : typeof m?.name === "object"
                ? m?.name?.name
                : m?.name
            )
            .filter(Boolean)
        : [];
      for (const name of materials) {
        await axiosCall({
          ENDPOINT: "vendor/add/material",
          METHOD: "POST",
          PAYLOAD: { vendor_id, name },
        });
      }

      const payment_modes: string[] = Array.isArray(values.payment_modes)
        ? values.payment_modes
        : [];
      for (const mode of payment_modes) {
        await axiosCall({
          ENDPOINT: "vendor/add/payment-mode",
          METHOD: "POST",
          PAYLOAD: { vendor_id, mode },
        });
      }

      const working_hours: any[] = Array.isArray(values.working_hours)
        ? values.working_hours
        : [];
      for (const wh of working_hours) {
        const payload = {
          vendor_id,
          day: wh.day,
          open: wh.open ?? "",
          close: wh.close ?? "",
          is_closed: Number(wh.is_closed ?? 0),
        };
        await axiosCall({
          ENDPOINT: "vendor/add/working-hours",
          METHOD: "POST",
          PAYLOAD: payload,
        });
      }

      toast.success("Additional vendor details saved successfully");
      dispatch(handleBackButton());
      navigate("/vendor-management");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Failed to save additional details";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialVendorAdditionalFormValue}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <>
            <MaterialsModal
              newMaterialsModal={newMaterialsModal}
              newMaterialsModalToggle={newMaterialsModalToggle}
              onAddMaterial={(newMaterial) => {
                setFieldValue("materials", [
                  ...(Array.isArray(values.materials) ? values.materials : []),
                  newMaterial, // directly push the string
                ]);
              }}
            />

            <PaymentModesModal
              newPaymentModeModal={newPaymentModeModal}
              newPaymentModeModalToggle={newPaymentModeModalToggle}
              onAddPaymentMode={(newMode) => {
                setFieldValue("payment_modes", [
                  ...(Array.isArray(values.payment_modes)
                    ? values.payment_modes
                    : []),
                  newMode,
                ]);
              }}
            />

            <WorkingHoursModal
              newWorkingHoursModal={newWorkingHoursModal}
              newWorkingHoursModalToggle={newWorkingHoursModalToggle}
              onAddWorkingHour={(newWorkingHour) => {
                setFieldValue("working_hours", [
                  ...(Array.isArray(values.working_hours)
                    ? values.working_hours
                    : []),
                  newWorkingHour,
                ]);
              }}
            />

            <Form className="theme-form">
              <Row className="g-3">
                <Row className="mt-3">
                  <Col md="9">
                    <Materials />
                  </Col>

                  <Col
                    md="3"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "12px",
                    }}
                  >
                    <Btn
                      color="light"
                      className="me-3"
                      style={{ color: "#3d3d47" }}
                      onClick={() => newMaterialsModalToggle()}
                    >
                      <i
                        className="fa fa-plus-circle"
                        style={{ marginRight: "6px" }}
                      />
                      Add New
                    </Btn>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md="9">
                    <PaymentModes />
                  </Col>

                  <Col
                    md="3"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "12px",
                    }}
                  >
                    <Btn
                      color="light"
                      className="me-3"
                      style={{ color: "#3d3d47" }}
                      onClick={() => newPaymentModeModalToggle()}
                    >
                      <i
                        className="fa fa-plus-circle"
                        style={{ marginRight: "6px" }}
                      />
                      Add New
                    </Btn>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md="9">
                    <WorkingHours />
                  </Col>

                  <Col
                    md="3"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "12px",
                    }}
                  >
                    <Btn
                      color="light"
                      className="me-3"
                      style={{ color: "#3d3d47" }}
                      onClick={() => newWorkingHoursModalToggle()}
                    >
                      <i
                        className="fa fa-plus-circle"
                        style={{ marginRight: "6px" }}
                      />
                      Add New
                    </Btn>
                  </Col>
                </Row>

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
          </>
        )}
      </Formik>
    </>
  );
};

export default VendorAdditionalInfoForm;
