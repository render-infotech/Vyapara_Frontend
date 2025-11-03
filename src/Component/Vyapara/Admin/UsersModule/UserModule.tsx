import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { UserManagement } from "../../../../utils/Constant";
import { Card, CardBody, Col, Container } from "reactstrap";
import UsersTab from "./UsersTable/UsersTab";
import Loader from "../../Loader/Loader";

function UserModule() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate dashboard loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds loader

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading && <Loader />}
      <>
        <Breadcrumbs mainTitle={UserManagement} parent={UserManagement} />
        <Container fluid>
          <Card>
            <CardBody>
              <Col sm="12">
                <UsersTab />
              </Col>
            </CardBody>
          </Card>
        </Container>
      </>
    </>
  );
}

export default UserModule;
