import React from "react";
import { DepositsTabType } from "../../../../../../Type/Vyapara/Admin/Deposits/DepositManagement";
import CommonModal from "../../../../../Ui-Kits/Modal/Common/CommonModal";
import { Col, Input, Label, Row } from "reactstrap";
import { Btn } from "../../../../../../AbstractElements";

interface ModalProps {
  viewModalOpen: boolean;
  viewModalToggle: () => void;
  rowData: DepositsTabType | null;
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
              {rowData?.customer && (
                <Col md="6">
                  <Label check>Customer</Label>
                  <Input type="text" placeholder={rowData?.customer} disabled />
                </Col>
              )}
              {rowData?.depositId && (
                <Col md="6">
                  <Label check>Deposit Id</Label>
                  <Input
                    type="text"
                    placeholder={rowData?.depositId}
                    disabled
                  />
                </Col>
              )}
              {rowData?.vendor && (
                <Col md="6">
                  <Label check>Vendor</Label>
                  <Input type="text" placeholder={rowData?.vendor} disabled />
                </Col>
              )}
              {rowData?.category && rowData.category.length > 0 && (
                <>
                  <Col md="12">
                    <Label check>Category</Label>
                  </Col>

                  {rowData.category.map((deposit, index) => {
                    const numberOfProducts = deposit.products.length;
                    const colSize = rowData.category.length === 1 ? 12 : 6;
                    return (
                      <Col md={colSize} key={index} className="mt-0">
                        <Label check>{deposit.depositType}</Label>
                        <Input
                          type="textarea"
                          value={deposit.products
                            .map((p) => `${p.name} (${p.purity}) - ${p.weight}`)
                            .join(`,${"\n"}`)}
                          disabled
                          rows={numberOfProducts}
                          style={{ resize: "none" }}
                        />
                      </Col>
                    );
                  })}
                </>
              )}
              {rowData?.value && (
                <Col md="6">
                  <Label check>Value</Label>
                  <Input type="text" placeholder={rowData?.value} disabled />
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
