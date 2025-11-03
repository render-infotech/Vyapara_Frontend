import { Col, Container, Row } from "reactstrap";
import { P } from "../../AbstractElements";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md="12" className="footer-copyright">
            <P className="mb-0">
              Copyright {currentYear} © Vyapara
            </P>
          </Col>
          {/* <Col md="6">
            <P className="mb-0 float-end">
              Hand crafted &amp; made with 
              <SVG iconId='footer-heart' className="svg-color footer-icon ms-1" />
            </P>
          </Col> */}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
