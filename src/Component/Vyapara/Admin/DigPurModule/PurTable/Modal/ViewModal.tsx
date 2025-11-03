import React from "react";
import { DigPurchaseTabType } from "../../../../../../Type/Vyapara/Admin/DigPurchases/DigPurchases";
import CommonModal from "../../../../../Ui-Kits/Modal/Common/CommonModal";
import { Col, Input, Label, Row } from "reactstrap";
import { Btn } from "../../../../../../AbstractElements";

interface ModalProps {
  viewModalOpen: boolean;
  viewModalToggle: () => void;
  rowData: DigPurchaseTabType | null;
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
              {rowData?.purId && (
                <Col md="6">
                  <Label check>Purchase ID</Label>
                  <Input
                    type="text"
                    placeholder={String(rowData?.purId)}
                    disabled
                  />
                </Col>
              )}
              {rowData?.metal && (
                <Col md="6">
                  <Label check>Metal</Label>
                  <Input type="text" placeholder={rowData?.metal} disabled />
                </Col>
              )}
              {rowData?.weight && (
                <Col md="6">
                  <Label check>Weight(grams)</Label>
                  <Input type="text" placeholder={rowData?.weight} disabled />
                </Col>
              )}
              {rowData?.amount && (
                <Col md="6">
                  <Label check>Amount</Label>
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
