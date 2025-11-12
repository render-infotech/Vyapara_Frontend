import React from "react";
import CommonModal from "../../../../../../../Ui-Kits/Modal/Common/CommonModal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  PaymentModeInitialValue,
  PaymentModeValidation,
} from "../../../../../../../../Type/Vyapara/Admin/Vendors/VendorAdditionalForm";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { Btn } from "../../../../../../../../AbstractElements";

interface ModalProps {
  newPaymentModeModal: boolean;
  newPaymentModeModalToggle: () => void;
  onAddPaymentMode: (newMode: string) => void;
}

const PaymentModesModal: React.FC<ModalProps> = ({
  newPaymentModeModal,
  newPaymentModeModalToggle,
  onAddPaymentMode,
}) => {
  const handleSubmit = async (values: any, { resetForm }: any) => {
    const newMode = values.payment_modes?.trim();
    if (newMode) {
      onAddPaymentMode(newMode); // ✅ send string back to parent
      resetForm();
      newPaymentModeModalToggle(); // close modal
    }
  };
  return (
    <CommonModal
      centered
      isOpen={newPaymentModeModal}
      toggle={newPaymentModeModalToggle}
      sizeTitle={`Add new payment modes`}
      modalBodyClassName="tableModal"
    >
      <div className="modal-toggle-wrapper">
        <Formik
          initialValues={PaymentModeInitialValue}
          validationSchema={PaymentModeValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="theme-form">
              <Row className="g-3">
                <Col md="12">
                  <FormGroup>
                    <Label check>Payment Modes</Label>
                    <span className="font-danger">*</span>

                    <Field
                      name="payment_modes"
                      as="textarea"
                      className="form-control"
                      placeholder="Enter payment modes"
                      rows="5"
                    />
                    <ErrorMessage
                      name="payment_modes"
                      component="span"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <Btn color="primary" type="submit">
                    Save{" "}
                  </Btn>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </CommonModal>
  );
};

export default PaymentModesModal;
