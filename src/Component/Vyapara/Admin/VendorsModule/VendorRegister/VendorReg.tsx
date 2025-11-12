import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../../../CommonElements/Breadcrumbs/Breadcrumbs";
import { Card, CardBody, Container } from "reactstrap";
import StepperFormHorizontal from "./RegistrationForm/StepperFormHorizontal";
import VendorBasicDetailsForm from "./RegistrationForm/BasicDetails/VendorBasicDetailsForm";
import Loader from "../../../Loader/Loader";
import VendorAdditionalInfoForm from "./RegistrationForm/AdditionalInformation/VendorAdditionalInfoForm";
import { useAppSelector } from "../../../../../ReduxToolkit/Hooks";
// import { useAppSelector } from "../../../../../ReduxToolkit/Hooks";

function VendorReg() {
  const numberLevel = useAppSelector((state) => state.vendorReg.numberLevel);

  const [loading, setLoading] = useState(false);

  //Scrolling effect on the breadcrumbs
  const [isScrolled, setIsScrolled] = useState(false);
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
          mainTitle="Vendor Registration"
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
                <VendorBasicDetailsForm setLoading={setLoading} />
              )}
              {numberLevel === 2 && (
                <VendorAdditionalInfoForm setLoading={setLoading} />
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}

export default VendorReg;
