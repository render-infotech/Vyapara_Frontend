import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { Card, CardBody, Container } from "reactstrap";
import { useAppSelector } from "../../../../../ReduxToolkit/Hooks";
import StepperFormHorizontal from "./EditForm/StepperFormHorizontal";
import VendorBasicEditForm from "./EditForm/BasicDetails/VendorBasicEditForm";
import VendorAdditionalEditForm from "./EditForm/AdditionalInformation/VendorAdditionalEditForm";
import Loader from "../../../Loader/Loader";

function VendorEdit() {
  const numberLevel = useAppSelector((state) => state.vendorEdit.numberLevel);
  const { singleVendorData } = useAppSelector((state) => state.vendorTab);

  //Scrolling effect on the breadcrumbs
  const [isScrolled, setIsScrolled] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className={`sticky-breadcrumbs ${isScrolled ? "scrolled" : ""}`}>
        <Breadcrumbs
          mainTitle={singleVendorData?.business_name ?? ""}
          parent="Vendor Management"
        />
      </div>
      <Container fluid>
        <Card>
          <CardBody className="basic-wizard important-validation mx-2">
            <StepperFormHorizontal level={numberLevel} />
            <div id="msform">
              {loading && <Loader />}
              {numberLevel === 1 && (
                <VendorBasicEditForm setLoading={setLoading} />
              )}
              {numberLevel === 2 && (
                <VendorAdditionalEditForm setLoading={setLoading} />
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default VendorEdit;
