import React from "react";
import CommonModal from "../../../../../../../../Ui-Kits/Modal/Common/CommonModal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { Btn } from "../../../../../../../../../AbstractElements";

interface EditModalProps {
  isOpen: boolean;
  toggle: () => void;
  selectedMaterial: { vendor_id: number; material_id: string; name: string } | null;
  onSave: (payload: { vendor_id: number; material_id: string; name: string }) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  toggle,
  selectedMaterial,
  onSave,
}) => {
  return (
    <CommonModal
      centered
      isOpen={isOpen}
      toggle={toggle}
      sizeTitle="Edit Material"
      modalBodyClassName="tableModal"
    >
      <div className="modal-toggle-wrapper">
        <Formik
          initialValues={{
            currentName: selectedMaterial?.name || "",
            newName: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await onSave({
              vendor_id: selectedMaterial!.vendor_id,
              material_id: selectedMaterial!.material_id,
              name: values.newName,
            });
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="theme-form">
              <Row className="g-3">
                <Col md="12">
                  <FormGroup>
                    <Label>Existing Name</Label>
                    <Field
                      name="currentName"
                      as="input"
                      className="form-control"
                      disabled
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <Label>New Name</Label>
                    <span className="font-danger">*</span>
                    <Field
                      name="newName"
                      as="input"
                      className="form-control"
                      placeholder="Enter new name"
                    />
                    <ErrorMessage
                      name="newName"
                      component="span"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>

                <Col md="12" className="text-end">
                  <Btn color="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
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

export default EditModal;
