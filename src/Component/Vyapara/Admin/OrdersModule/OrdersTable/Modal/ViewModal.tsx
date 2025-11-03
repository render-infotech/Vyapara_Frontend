import React from "react";
import { OrdersTabType } from "../../../../../../Type/Vyapara/Admin/Orders/OrderManagement";
import CommonModal from "../../../../../Ui-Kits/Modal/Common/CommonModal";
import { Col, Input, Label, Row } from "reactstrap";
import { Btn } from "../../../../../../AbstractElements";

interface ModalProps {
  viewModalOpen: boolean;
  viewModalToggle: () => void;
  rowData: OrdersTabType | null;
}

const ViewModal: React.FC<ModalProps> = ({
  viewModalOpen,
  viewModalToggle,
  rowData,
}) => {
  const handleSubmit = () => {
    viewModalToggle();
  };
  return (
    <CommonModal
      centered
      modalBodyClassName="tableModal"
      isOpen={viewModalOpen}
      toggle={viewModalToggle}
      sizeTitle="Details"
    >
      {rowData ? (
        <div className="modal-toggle-wrapper">
          <form className="theme-form">
            <Row className="g-3">
              {rowData?.id && (
                <Col md="6">
                  <Label check>ID</Label>
                  <Input
                    type="text"
                    placeholder={String(rowData?.id)}
                    disabled
                  />
                </Col>
              )}
              {rowData?.user && (
                <Col md="6">
                  <Label check>User</Label>
                  <Input type="text" placeholder={rowData?.user} disabled />
                </Col>
              )}
              {rowData?.orderId && (
                <Col md="6">
                  <Label check>Order ID</Label>
                  <Input type="text" placeholder={rowData?.orderId} disabled />
                </Col>
              )}
              {rowData?.metal && (
                <Col md="6">
                  <Label check>Metal</Label>
                  <Input type="text" placeholder={rowData?.metal} disabled />
                </Col>
              )}
              {rowData?.products && rowData.products.length > 0 && (
                <Col md="12">
                  <Label check>Products</Label>
                  <Input
                    type="textarea"
                    value={rowData.products
                      .map(
                        (product) => `${product.category} - ${product.weight}`
                      )
                      .join("\n")}
                    disabled
                    rows={rowData.products.length}
                    style={{ resize: "none" }}
                  />
                </Col>
              )}

              {rowData?.vendor && (
                <Col md="6">
                  <Label check>Vendor</Label>
                  <Input type="text" placeholder={rowData?.vendor} disabled />
                </Col>
              )}
              {rowData?.amount && (
                <Col md="6">
                  <Label check>Price</Label>
                  <Input type="text" placeholder={rowData?.amount} disabled />
                </Col>
              )}
              {rowData?.status && (
                <Col md="6">
                  <Label check>Status</Label>
                  <Input type="text" placeholder={rowData?.status} disabled />
                </Col>
              )}
              {rowData?.date && (
                <Col md="6">
                  <Label check>Date</Label>
                  <Input type="text" placeholder={rowData?.date} disabled />
                </Col>
              )}

              <Col xs="12">
                <Btn color="primary" onClick={handleSubmit}>
                  Close
                </Btn>
              </Col>
            </Row>
          </form>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </CommonModal>
  );
};

export default ViewModal;
