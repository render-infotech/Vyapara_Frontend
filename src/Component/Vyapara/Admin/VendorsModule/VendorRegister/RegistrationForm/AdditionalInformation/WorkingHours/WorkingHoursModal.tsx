import React from "react";
import CommonModal from "../../../../../../../Ui-Kits/Modal/Common/CommonModal";
import {
  WorkingHourInitialValue,
  WorkingHourValidation,
} from "../../../../../../../../Type/Vyapara/Admin/Vendors/VendorAdditionalForm";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { Btn } from "../../../../../../../../AbstractElements";

interface ModalProps {
  newWorkingHoursModal: boolean;
  newWorkingHoursModalToggle: () => void;
  onAddWorkingHour: (newWorkingHour: {
    day: string;
    open: string;
    close: string;
    is_closed: string;
  }) => void;
}

const WorkingHoursModal: React.FC<ModalProps> = ({
  newWorkingHoursModal,
  newWorkingHoursModalToggle,
  onAddWorkingHour,
}) => {
  const handleSubmit = async (values: any, { resetForm }: any) => {
    const newWorkingHour = values.working_hours[0];
    onAddWorkingHour(newWorkingHour);
    resetForm();
    newWorkingHoursModalToggle(); // close after saving
  };
  return (
    <CommonModal
      centered
      isOpen={newWorkingHoursModal}
      toggle={newWorkingHoursModalToggle}
      sizeTitle={`Add new working hours`}
      modalBodyClassName="tableModal"
    >
      <div className="modal-toggle-wrapper">
        <Formik
          initialValues={WorkingHourInitialValue}
          validationSchema={WorkingHourValidation}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="theme-form">
              <Row className="g-3">
                <Col md="12">
                  <FormGroup>
                    <Label check>Day</Label>
                    <span className="font-danger">*</span>

                    <Field
                      name="working_hours[0].day"
                      as="textarea"
                      className="form-control"
                      placeholder="Enter day"
                      rows="2"
                    />
                    <ErrorMessage
                      name="working_hours[0].day"
                      component="span"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <Label check>Open Time</Label>
                    <span className="font-danger">*</span>

                    <Field
                      name="working_hours[0].open"
                      as="textarea"
                      className="form-control"
                      placeholder="Enter open time"
                      rows="2"
                    />
                    <ErrorMessage
                      name="working_hours[0].open"
                      component="span"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <Label check>Close Time</Label>
                    <span className="font-danger">*</span>

                    <Field
                      name="working_hours[0].close"
                      as="textarea"
                      className="form-control"
                      placeholder="Enter close time"
                      rows="2"
                    />
                    <ErrorMessage
                      name="working_hours[0].close"
                      component="span"
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <Label check>Is Closed</Label>
                    <span className="font-danger">*</span>

                    <Field
                      as="select"
                      name="working_hours[0].is_closed"
                      className="form-control"
                    >
                      <option value="">Select...</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </Field>

                    <ErrorMessage
                      name="working_hours[0].is_closed"
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

export default WorkingHoursModal;
