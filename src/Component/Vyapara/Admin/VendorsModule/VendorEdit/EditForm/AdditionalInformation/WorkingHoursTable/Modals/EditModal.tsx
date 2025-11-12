import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import CommonModal from "../../../../../../../../Ui-Kits/Modal/Common/CommonModal";
import { Btn } from "../../../../../../../../../AbstractElements";

interface EditModalProps {
  isOpen: boolean;
  toggle: () => void;
  selectedHour: {
    vendor_id: number;
    hour_id: string;
    day: string;
    open: string;
    close: string;
    is_closed: number;
  } | null;
  onSave: (payload: {
    vendor_id: number;
    hour_id: string;
    day: string;
    open: string;
    close: string;
    is_closed: number;
  }) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  toggle,
  selectedHour,
  onSave,
}) => {
  if (!selectedHour) return null;
  return (
    <CommonModal
      centered
      isOpen={isOpen}
      toggle={toggle}
      sizeTitle="Edit Working Hour"
      modalBodyClassName="tableModal"
    >
      <div className="modal-toggle-wrapper">
        <Formik
          initialValues={{
            newDay: "",
            newOpen: "",
            newClose: "",
            newIsClosed: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const payload = {
              vendor_id: selectedHour.vendor_id,
              hour_id: selectedHour.hour_id,
              day: values.newDay || selectedHour.day,
              open: values.newOpen || selectedHour.open,
              close: values.newClose || selectedHour.close,
              is_closed: values.newIsClosed
                ? Number(values.newIsClosed)
                : selectedHour.is_closed,
            };
            await onSave(payload);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="theme-form">
              <Row className="g-3">
                {/* Day */}
                <Col md="12">
                  <FormGroup>
                    <Label>Existing Day</Label>
                    <Input value={selectedHour.day} disabled />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>New Day</Label>
                    <span className="font-danger">*</span>
                    <Field
                      name="newDay"
                      as="input"
                      className="form-control"
                      placeholder="Enter new day"
                    />
                    <ErrorMessage
                      name="newDay"
                      component="span"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>

                {/* Open */}
                <Col md="6">
                  <FormGroup>
                    <Label>Existing Open Time</Label>
                    <Input value={selectedHour.open} disabled />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>New Open Time</Label>
                    <span className="font-danger">*</span>
                    <Field
                      name="newOpen"
                      as="input"
                      className="form-control"
                      type="text"
                      placeholder="Enter new open time"
                    />
                    <ErrorMessage
                      name="newOpen"
                      component="span"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>

                {/* Close */}
                <Col md="6">
                  <FormGroup>
                    <Label>Existing Close Time</Label>
                    <Input value={selectedHour.close} disabled />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>New Close Time</Label>
                    <span className="font-danger">*</span>
                    <Field
                      name="newClose"
                      as="input"
                      className="form-control"
                      type="text"
                      placeholder="Enter new close time"
                    />
                    <ErrorMessage
                      name="newClose"
                      component="span"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>

                {/* Is Closed */}
                <Col md="6">
                  <FormGroup>
                    <Label>Existing Is Closed</Label>
                    <Input
                      value={selectedHour.is_closed === 1 ? "Yes" : "No"}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>New Is Closed</Label>
                    <span className="font-danger">*</span>

                    <Field
                      as="select"
                      name="newIsClosed"
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </Field>

                    <ErrorMessage
                      name="newIsClosed"
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
