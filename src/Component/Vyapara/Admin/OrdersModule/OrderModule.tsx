import React, { useState } from "react";
import { Card, CardBody, Col, Container, FormGroup, Label, Row } from "reactstrap";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import OrdersTab from "./OrdersTable/OrdersTab";
import { Field, FieldProps, Form, Formik } from "formik";

function OrderModule() {
  const [selectedStatus, setSelectedStatus] = useState<number>(0);

  const filterOptions = [
    { id: 0, label: "All Status" },
    { id: 1, label: "Delivered" },
    { id: 2, label: "In Transit" },
    { id: 3, label: "Cancelled" },
  ];

  const handleScheduleListForm = (values: any) => {
    console.log("Selected Filter:", values.scheduling_list_id);
    // ✅ Update the local state when form changes
    setSelectedStatus(values.scheduling_list_id);
  };
  return (
    <>
      <Breadcrumbs mainTitle="Order Management" parent="Order Management" />
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
                            <Label check>Filter By Status</Label>
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
              <Col md="12">
                <OrdersTab selectedStatus={selectedStatus} />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default OrderModule;
