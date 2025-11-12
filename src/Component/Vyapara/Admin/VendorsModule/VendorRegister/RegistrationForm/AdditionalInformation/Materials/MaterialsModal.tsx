import React from "react";
import CommonModal from "../../../../../../../Ui-Kits/Modal/Common/CommonModal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { Btn } from "../../../../../../../../AbstractElements";
import {
  MaterialInitialValue,
  MaterialValidation,
} from "../../../../../../../../Type/Vyapara/Admin/Vendors/VendorAdditionalForm";

interface ModalProps {
  newMaterialsModal: boolean;
  newMaterialsModalToggle: () => void;
  onAddMaterial: (name: string) => void; // ✅ new callback
}

const MaterialsModal: React.FC<ModalProps> = ({
  newMaterialsModal,
  newMaterialsModalToggle,
  onAddMaterial,
}) => {
  const handleSubmit = async (values: any, { resetForm }: any) => {
    if (values.materials && values.materials.trim() !== "") {
      onAddMaterial(values.materials.trim()); // ✅ send string only
      resetForm();
      newMaterialsModalToggle();
    }
  };

  return (
    <CommonModal
      centered
      isOpen={newMaterialsModal}
      toggle={newMaterialsModalToggle}
      sizeTitle={`Add new materials`}
      modalBodyClassName="tableModal"
    >
      <div className="modal-toggle-wrapper">
        <Formik
          initialValues={MaterialInitialValue}
          validationSchema={MaterialValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="theme-form">
              <Row className="g-3">
                <Col md="12">
                  <FormGroup>
                    <Label check>Materials</Label>
                    <span className="font-danger">*</span>

                    <Field
                      name="materials"
                      as="textarea"
                      className="form-control"
                      placeholder="Enter materials"
                      rows="5"
                    />
                    <ErrorMessage
                      name="materials"
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

export default MaterialsModal;
