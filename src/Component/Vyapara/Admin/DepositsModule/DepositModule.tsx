import React, { useState } from "react";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { DepositManagement } from "../../../../utils/Constant";
import { Card, CardBody, Col, Container, FormGroup, Label, Row } from "reactstrap";
import DepositsTab from "./DepositsTable/DepositsTab";
import { Field, FieldProps, Form, Formik } from "formik";

function DepositModule() {
  const [selectedStatus, setSelectedStatus] = useState<number>(0);

  const filterOptions = [
    { id: 0, label: "All Categories" },
    { id: 1, label: "Gold Deposit" },
    { id: 2, label: "Silver Deposit" },
  ];

  const handleScheduleListForm = (values: any) => {
    console.log("Selected Filter:", values.scheduling_list_id);
    // ✅ Update the local state when form changes
    setSelectedStatus(values.scheduling_list_id);
  };
  return (
    <>
      <Breadcrumbs mainTitle={DepositManagement} parent={DepositManagement} />
      <Container fluid>
        <Card>
          <CardBody>
            <Row>
              <Col md="6" className="mt-3 mb-4">
                <Formik
                  initialValues={{ scheduling_list_id: 0 }}
                  onSubmit={handleScheduleListForm}
                >
                  {({ setFieldValue, values }) => (
                    <Form className="theme-form">
                      <Row className="g-2">
                        <Col md="12">
                          <FormGroup>
                            <Label check>Filter By Category</Label>
                            <Field name="scheduling_list_id">
                              {({ field }: FieldProps) => (
                                <select
                                  {...field}
                                  className="form-control"
                                  onChange={(e) => {
                                    const selected = Number(e.target.value);
                                    setFieldValue(field.name, selected);
                                    setSelectedStatus(selected);
                                  }}
                                >
                                  {filterOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </Field>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Col>
              <Col>
                <DepositsTab selectedStatus={selectedStatus} />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default DepositModule;
