import React from "react";
import Breadcrumbs from "../../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { Card, CardBody, Col, Container } from "reactstrap";
import VendorComm from "./VendorComm/VendorComm";

function CommissionModule() {
  return (
    <>
      <Breadcrumbs
        mainTitle="Commission Management"
        parent="Commission Management"
      />
      <Container fluid>
        <Card>
          <CardBody>
            <Col sm="12">
              <VendorComm />
            </Col>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default CommissionModule;
