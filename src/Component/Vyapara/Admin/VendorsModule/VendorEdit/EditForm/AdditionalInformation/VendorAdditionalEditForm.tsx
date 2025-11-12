import React, { useState } from "react";
import { VendorRegistrationFormPropType } from "../../../../../../../Type/Vyapara/Admin/Vendors/VendorAdditionalForm";
import MaterialsTab from "./MaterialsTable/MaterialsTab";
import PaymentModesTab from "./PaymentModesTable/PaymentModesTab";
import WorkingHoursTab from "./WorkingHoursTable/WorkingHoursTab";
import CommonCardHeader from "../../../../../../../CommonElements/CommonCardHeader/CommonCardHeader";
import { Col } from "reactstrap";
import { Btn } from "../../../../../../../AbstractElements";
import MaterialsModal from "../../../VendorRegister/RegistrationForm/AdditionalInformation/Materials/MaterialsModal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../ReduxToolkit/Hooks";
import axiosCall from "../../../../../../../Api/APIcall";
import PaymentModesModal from "../../../VendorRegister/RegistrationForm/AdditionalInformation/PaymentModes/PaymentModesModal";
import WorkingHoursModal from "../../../VendorRegister/RegistrationForm/AdditionalInformation/WorkingHours/WorkingHoursModal";
import { toast } from "react-toastify";
import { handleBackButton } from "../../../../../../../ReduxToolkit/Reducers/Vendors/VendorEditSlice";
import { setSingleVendorData } from "../../../../../../../ReduxToolkit/Reducers/Vendors/VendorTabSlice";
import { Link } from "react-router-dom";

export interface AddMaterialResponse {
  data?: {
    id?: string;
    name?: string;
  };
  message?: string;
  status?: number;
}

export interface AddPaymentModeResponse {
  data?: {
    id?: string;
    mode?: string;
  };
  message?: string;
  status?: number;
}

export interface AddWorkingHoursResponse {
  data?: {
    id?: string;
    day?: string;
    open?: string;
    close?: string;
    is_closed?: number;
  };
  message?: string;
  status?: number;
}

const VendorAdditionalEditForm: React.FC<VendorRegistrationFormPropType> = ({
  setLoading,
}) => {
  const dispatch = useAppDispatch();
  const { singleVendorData } = useAppSelector((s) => s.vendorTab);
  const vendorId = singleVendorData?.vendor_id;

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
  return (
    <>
      <MaterialsModal
        newMaterialsModal={newMaterialsModal}
        newMaterialsModalToggle={newMaterialsModalToggle}
        onAddMaterial={async (name) => {
          if (!vendorId) return;
          try {
            setLoading(true);
            const response = await axiosCall<AddMaterialResponse>({
              ENDPOINT: "vendor/add/material",
              METHOD: "POST",
              PAYLOAD: { vendor_id: vendorId, name },
            });
            toast.success("Material added successfully ✅");
            // Update local redux vendor materials so table refreshes immediately
            const created = response?.data?.data;
            const newMaterial = created?.id
              ? { id: String(created.id), name: created.name || name }
              : { id: String(Date.now()), name };
            dispatch(
              setSingleVendorData({
                ...(singleVendorData as any),
                materials: [
                  ...((singleVendorData?.materials as any[]) || []),
                  newMaterial,
                ],
              } as any)
            );
          } catch (error) {
            toast.error("Failed to add material ❌");
          } finally {
            setLoading(false);
          }
        }}
      />
      <PaymentModesModal
        newPaymentModeModal={newPaymentModeModal}
        newPaymentModeModalToggle={newPaymentModeModalToggle}
        onAddPaymentMode={async (mode) => {
          if (!vendorId) return;
          try {
            setLoading(true);
            const response = await axiosCall<AddPaymentModeResponse>({
              ENDPOINT: "vendor/add/payment-mode",
              METHOD: "POST",
              PAYLOAD: { vendor_id: vendorId, mode },
            });
            toast.success("Payment mode added successfully ✅");
            // Update Redux so table re-renders immediately
            const created = response?.data?.data;
            const newMode = (
              typeof created === "string"
                ? created
                : created?.mode ?? mode
            ) as string;
            dispatch(
              setSingleVendorData({
                ...(singleVendorData as any),
                payment_modes: [
                  ...((singleVendorData?.payment_modes as any[]) || []),
                  newMode,
                ],
              } as any)
            );
          } catch (error) {
            toast.error("Failed to add payment mode ❌");
          } finally {
            setLoading(false);
          }
        }}
      />
      <WorkingHoursModal
        newWorkingHoursModal={newWorkingHoursModal}
        newWorkingHoursModalToggle={newWorkingHoursModalToggle}
        onAddWorkingHour={async (wh) => {
          if (!vendorId) return;
          try {
            setLoading(true);
            const response = await axiosCall<AddWorkingHoursResponse>({
              ENDPOINT: "vendor/add/working-hours",
              METHOD: "POST",
              PAYLOAD: {
                vendor_id: vendorId,
                day: wh.day,
                open: wh.open ?? "",
                close: wh.close ?? "",
                is_closed: Number(wh.is_closed ?? 0),
              },
            });
            toast.success("Working hour added successfully ✅");
            // Update Redux so table re-renders immediately
            const created = response?.data?.data;
            const newWh = {
              id: created?.id ? String(created.id) : String(Date.now()),
              day: created?.day ?? wh.day,
              open: created?.open ?? (wh.open ?? ""),
              close: created?.close ?? (wh.close ?? ""),
              is_closed: Number(created?.is_closed ?? wh.is_closed ?? 0),
            } as any;
            dispatch(
              setSingleVendorData({
                ...(singleVendorData as any),
                working_hours: [
                  ...((singleVendorData?.working_hours as any[]) || []),
                  newWh,
                ],
              } as any)
            );
          } catch (error) {
            toast.error("Failed to add working hour ❌");
          } finally {
            setLoading(false);
          }
        }}
      />
      <CommonCardHeader
        title="Materials"
        tagClass={"card-title mb-0"}
        headClass="custom-card-header"
      />
      <>
        <Col sm="12" className="mt-3 mb-4 d-flex justify-content-end">
          <Btn color="primary" onClick={() => newMaterialsModalToggle()}>
            <i className="fa fa-plus-circle me-2" />
            Add New Material
          </Btn>
        </Col>
        <MaterialsTab />
      </>
      <CommonCardHeader
        title="Payment Modes"
        tagClass={"card-title mb-0"}
        headClass="custom-card-header"
      />
      <>
        <Col sm="12" className="mt-3 mb-4 d-flex justify-content-end">
          <Btn color="primary" onClick={() => newPaymentModeModalToggle()}>
            <i className="fa fa-plus-circle me-2" />
            Add New Payment Mode
          </Btn>
        </Col>
        <PaymentModesTab />
      </>
      <CommonCardHeader
        title="Working Hours"
        tagClass={"card-title mb-0"}
        headClass="custom-card-header"
      />
      <>
        <Col sm="12" className="mt-3 mb-4 d-flex justify-content-end">
          <Btn color="primary" onClick={() => newWorkingHoursModalToggle()}>
            <i className="fa fa-plus-circle me-2" />
            Add New Working Hour
          </Btn>
        </Col>
        <WorkingHoursTab />
      </>

      <Col
        xs="12"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Link to="/vendor-management">
          <Btn
            color="primary"
            className="me-3"
            onClick={() => dispatch(handleBackButton())}
          >
            Submit
          </Btn>
        </Link>
        <Link to="/vendor-management">
          <Btn
            color="danger"
            className="me-3"
            onClick={() => dispatch(handleBackButton())}
          >
            Cancel
          </Btn>
        </Link>
      </Col>
    </>
  );
};

export default VendorAdditionalEditForm;
