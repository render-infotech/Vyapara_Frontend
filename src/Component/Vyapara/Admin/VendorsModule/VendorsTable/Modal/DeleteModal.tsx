import { toast } from "react-toastify";
import axiosCall from "../../../../../../Api/APIcall";
import CommonModal from "../../../../../Ui-Kits/Modal/Common/CommonModal";
import { Btn, H4, Image, LI, UL } from "../../../../../../AbstractElements";
import { dynamicImage } from "../../../../../../Service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../ReduxToolkit/Store";
import { setAllVendors } from "../../../../../../ReduxToolkit/Reducers/Vendors/VendorTabSlice";
import { useState } from "react";
import Loader from "../../../../Loader/Loader";

interface SelectedRowIdProp {
  vendor_id: number;
}

interface ModalProps {
  deleteModalOpen: boolean;
  deleteModalToggle: () => void;
  rowId: SelectedRowIdProp | null;
  setReload: (loading: boolean) => void;
  reload: boolean;
}

interface ApiResponse {
  data: object;
  success: boolean;
  message: string;
}

const DeleteModal: React.FC<ModalProps> = ({
  deleteModalOpen,
  deleteModalToggle,
  rowId,
  setReload,
  reload,
}) => {
  const dispatch = useDispatch();
  const allVendors = useSelector(
    (state: RootState) => state.vendorTab.allVendors
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: SelectedRowIdProp) => {
    setLoading(true)
    const payload = {
      vendor_id: values.vendor_id,
    };

    try {
      const response = await axiosCall<ApiResponse>({
        ENDPOINT: "vendor/delete",
        METHOD: "POST",
        PAYLOAD: payload,
      });
      deleteModalToggle();
      toast.success(response.data.message);
      // ✅ Instantly remove the vendor from Redux state
      const updatedVendors = allVendors.filter(
        (vendor) => vendor.vendor_id !== values.vendor_id
      );
      dispatch(setAllVendors(updatedVendors));
      setReload(!reload);
    } catch (error: any) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Something went wrong";
        toast.error(errorMessage);
      } else if (error.request) {
        console.error("No response received:", error.request);
      }
    } finally {
      setLoading(false)
    }
  };

  return (
    <CommonModal
      centered
      isOpen={deleteModalOpen}
      toggle={deleteModalToggle}
      sizeTitle="Delete"
      modalBodyClassName="tableModal"
    >
      {rowId ? (
        <div className="modal-toggle-wrapper">
          <UL className="modal-img">
            <LI className="text-center">
              <Image src={dynamicImage(`gif/danger.gif`)} alt="error" />
            </LI>
          </UL>
          <H4 className="text-center pb-2">Delete this Vendor?</H4>
          <Btn
            color="danger"
            className="d-flex m-auto"
            onClick={() => handleSubmit(rowId)}
          >
            {loading && <Loader />}
            Delete
          </Btn>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </CommonModal>
  );
};

export default DeleteModal;
