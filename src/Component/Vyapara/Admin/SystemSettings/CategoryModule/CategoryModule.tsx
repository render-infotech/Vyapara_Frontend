import React from "react";
import Breadcrumbs from "../../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import CategoryTab from "./CategoryTable/CategoryTab";
import { Link } from "react-router-dom";
import { Btn } from "../../../../../AbstractElements";

function CategoryModule() {
  return (
    <>
      <Breadcrumbs
        mainTitle="Category Management"
        parent="Category Management"
      />
      <Container fluid>
        <Card>
          <CardBody>
            <Row>
              <Col
                sm="12"
                className="mt-3 mb-4"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {" "}
                <Link to={""}>
                  <Btn color="primary">
                    <i
                      className="fa fa-plus-circle"
                      style={{ marginRight: "6px" }}
                    />
                    Add New Category
                  </Btn>
                </Link>
              </Col>

              <Col sm="12">
                <CategoryTab />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default CategoryModule;
