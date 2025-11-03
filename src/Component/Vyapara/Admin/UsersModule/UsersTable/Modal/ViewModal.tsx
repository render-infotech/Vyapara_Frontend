import { Col, Input, Label, Row } from "reactstrap";
import { UserManagementTabType } from "../../../../../../Type/Vyapara/Admin/Users/UserManagement";
import CommonModal from "../../../../../Ui-Kits/Modal/Common/CommonModal";
import { Btn } from "../../../../../../AbstractElements";

interface ModalProps {
  viewModalOpen: boolean;
  viewModalToggle: () => void;
  rowData: UserManagementTabType | null;
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
      sizeTitle="User"
    >
      {rowData ? (
        <div className="modal-toggle-wrapper">
          <form className="theme-form">
            <Row className="g-3">
              {rowData?.userId && (
                <Col md="6">
                  <Label check>User ID</Label>
                  <Input type="text" placeholder={rowData?.userId} disabled />
                </Col>
              )}
              {rowData?.name && (
                <Col md="6">
                  <Label check>Name</Label>
                  <Input type="text" placeholder={rowData?.name} disabled />
                </Col>
              )}
              {rowData?.email && (
                <Col md="6">
                  <Label check>Email</Label>
                  <Input type="text" placeholder={rowData?.email} disabled />
                </Col>
              )}
              {rowData?.mobNo && (
                <Col md="6">
                  <Label check>Mobile No</Label>
                  <Input type="text" placeholder={rowData?.mobNo} disabled />
                </Col>
              )}
              {rowData?.kycstatus && (
                <Col md="6">
                  <Label check>KYC Status</Label>
                  <Input
                    type="text"
                    placeholder={rowData?.kycstatus}
                    disabled
                  />
                </Col>
              )}
              {rowData?.aadhar && (
                <Col md="6">
                  <Label check>Aadhar No</Label>
                  <Input type="text" placeholder={rowData?.aadhar} disabled />
                </Col>
              )}
              {rowData?.holdingsValue && (
                <>
                  <Col md="3">
                    <Label check>Digital Gold</Label>
                    <Input
                      type="text"
                      value={`₹${rowData.holdingsValue.dGold.toLocaleString()}`}
                      disabled
                    />
                  </Col>
                  <Col md="3">
                    <Label check>Digital Silver</Label>
                    <Input
                      type="text"
                      value={`₹${rowData.holdingsValue.dSilver.toLocaleString()}`}
                      disabled
                    />
                  </Col>
                  <Col md="6">
                    <Label check>Total Holdings</Label>
                    <Input
                      type="text"
                      value={`₹${(
                        rowData.holdingsValue.dGold +
                        rowData.holdingsValue.dSilver
                      ).toLocaleString()}`}
                      disabled
                    />
                  </Col>
                </>
              )}

              {rowData?.addresses?.map((addr, index) => (
                <Col md="12" key={addr.id || index}>
                  <Label check>{`Address ${index + 1}`}</Label>
                  <Input
                    type="textarea"
                    value={`${addr.line1}${
                      addr.line2 ? ", " + addr.line2 : ""
                    }, ${addr.city}, ${addr.state} - ${addr.pincode}`}
                    disabled
                    rows={3}
                    style={{ resize: "none" }}
                  />
                </Col>
              ))}

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
