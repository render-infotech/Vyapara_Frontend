import React, { useState } from "react";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { Card, CardBody, Col, Row } from "reactstrap";
import ReportsTab from "./ReportsTable/ReportsTab";
import ReportsFilter from "./ReportsFilter/ReportsFilter";

function ReportModule() {
  // ✅ parent owns the state now
  const [selectedStatus, setSelectedStatus] = useState<number>(0);
  const [selectedDateRange, setSelectedDateRange] = useState<string>("");

  return (
    <>
      <Breadcrumbs
        mainTitle="Reports & Analytics"
        parent="Reports & Analytics"
      />
      <Card>
        <CardBody>
          <Row>
            <Col sm="12">
              <ReportsFilter
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                selectedDateRange={selectedDateRange}
                setSelectedDateRange={setSelectedDateRange}
              />
            </Col>
            <Col sm="12">
              <ReportsTab
                selectedStatus={selectedStatus}
                selectedDateRange={selectedDateRange}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}

export default ReportModule;
