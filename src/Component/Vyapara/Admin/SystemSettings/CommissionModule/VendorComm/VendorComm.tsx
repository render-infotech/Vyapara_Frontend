import React from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { Btn } from "../../../../../../AbstractElements";

function VendorComm() {
  return (
    <>
      <Form className="theme-form">
        <Col sm="12">
          <Label check>Default Vendor Commission(%)</Label>
          <Row className="align-items-center">
            <Col sm="8">
              <Input type="number" placeholder={""} defaultValue={0} />
            </Col>
            <Col sm="3">
              <Btn color="primary">
                <i className="fa fa-save" style={{ marginRight: "6px" }} /> Save
              </Btn>
            </Col>
          </Row>
        </Col>
      </Form>
    </>
  );
}

export default VendorComm;
