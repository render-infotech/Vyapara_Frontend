import { ErrorMessage, Field, FieldProps, Formik } from "formik";
import React from "react";
import { Col, Form, FormGroup, Label, Row } from "reactstrap";

interface ReportsFilterProps {
  selectedStatus: number;
  setSelectedStatus: (status: number) => void;
  selectedDateRange: string;
  setSelectedDateRange: (range: string) => void;
}

function ReportsFilter({
  selectedStatus,
  setSelectedStatus,
  selectedDateRange,
  setSelectedDateRange,
}: ReportsFilterProps) {
  const filterOptions = [
    { id: 0, label: "All" },
    { id: 1, label: "Gold" },
    { id: 2, label: "Silver" },
  ];

  const dateRangeSelctionOptions = [
    { id: "", type: "All" },
    { id: "Yearly", type: "Yearly" },
    { id: "Monthly", type: "Monthly" },
    { id: "Weekly", type: "Weekly" },
  ];

  const handleDateRangeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const value = e.target.value;
    setFieldValue("date_range", value);
    setSelectedDateRange(value);
  };

  const handleScheduleListForm = (values: any) => {
    setSelectedStatus(values.scheduling_list_id);
  };

  return (
    <Formik
      initialValues={{
        scheduling_list_id: selectedStatus,
        date_range: selectedDateRange,
      }}
      onSubmit={handleScheduleListForm}
    >
      {({ setFieldValue }) => (
        <Form className="theme-form">
          <Row className="g-2">
            <Col md="4">
              <FormGroup>
                <Label check>Metal</Label>
                <Field name="scheduling_list_id">
                  {({ field }: FieldProps) => (
                    <select
                      {...field}
                      className="form-control"
                      onChange={(e) => {
                        const selected = Number(e.target.value);
                        setFieldValue(field.name, selected);
                        setSelectedStatus(selected); // key change: update parent
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
                <ErrorMessage
                  name="category_id"
                  component="span"
                  className="invalid-feedback font-danger"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <Label check>Date Range</Label>
              <Field
                name="date_range"
                as="select"
                className="form-control"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleDateRangeChange(e, setFieldValue)
                }
              >
                {dateRangeSelctionOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.type}
                  </option>
                ))}
              </Field>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default ReportsFilter;
