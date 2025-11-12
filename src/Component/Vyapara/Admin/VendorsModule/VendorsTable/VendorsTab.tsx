import React, { useEffect, useMemo, useState } from "react";
import { SearchTableButton } from "../../../../../utils/Constant";
import { Input, Label } from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { Vendor } from "../../../../../Type/Vyapara/Admin/Vendors/VendorManangement";
import Loader from "../../../Loader/Loader";
import axiosCall from "../../../../../Api/APIcall";
import { toast } from "react-toastify";
import DeleteModal from "./Modal/DeleteModal";
import ViewModal from "./Modal/ViewModal";
import { useNavigate } from "react-router-dom";
import { saveSelectedVendorId } from "../../../../../utils/IndexedDbVyapara/Vendor/IxDbEditVendor";
import { setSingleVendorData } from "../../../../../ReduxToolkit/Reducers/Vendors/VendorTabSlice";
import { useDispatch } from "react-redux";

interface ActionDataSourceProp {
  data: Vendor;
}

interface PurTabProps {
  selectedLocation: string; // empty string means All
  vendors: Vendor[];
  loading: boolean;
}

interface SelectedRowIdProp {
  vendor_id: number;
}

function VendorsTab({ selectedLocation, vendors, loading }: PurTabProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navigating, setNavigating] = useState(false);
  const [loginEnabledStates, setLoginEnabledStates] = useState<
    Record<number, boolean>
  >({});
  const [toggleLoading, setToggleLoading] = useState<Record<number, boolean>>(
    {}
  );
  const [selectedRowId, setSelectedRowId] = useState<SelectedRowIdProp | null>(
    null
  );
  const [selectedRowData, setSelectedRowData] = useState<Vendor | null>(null);
  //View Modal
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const viewModalToggle = () => setViewModalOpen(!viewModalOpen);

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const deleteModalToggle = () => setDeleteModalOpen(!deleteModalOpen);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    const initialStates: Record<number, boolean> = {};
    vendors.forEach((vendor) => {
      // is_deactivated = 1 → disabled → loginEnabled = false
      initialStates[vendor.vendor_id] = vendor.is_deactivated === 0;
    });
    setLoginEnabledStates(initialStates);
  }, [vendors]);

  const handleToggleLogin = async (vendor: Vendor) => {
    const vendorId = vendor.vendor_id;

    const currentState = loginEnabledStates[vendorId]; // true = enabled, false = disabled
    const newState = !currentState; // flip

    setLoginEnabledStates((prev) => ({ ...prev, [vendorId]: newState }));
    setToggleLoading((prev) => ({ ...prev, [vendorId]: true }));

    try {
      // If enabling login → is_deactivated=0
      // If disabling login → is_deactivated=1
      const endpoint = newState
        ? "vendor/enable-login"
        : "vendor/disable-login";

      const { data } = await axiosCall<{ message: string; status: number }>({
        ENDPOINT: endpoint,
        METHOD: "POST",
        PAYLOAD: { vendor_id: vendorId },
      });

      toast.success(
        data.message ||
          `Login ${newState ? "enabled" : "disabled"} successfully`
      );
    } catch (error: any) {
      // revert on error
      setLoginEnabledStates((prev) => ({ ...prev, [vendorId]: currentState }));
      toast.error(
        error?.response?.data?.message || "Failed to update login status"
      );
    } finally {
      setToggleLoading((prev) => ({ ...prev, [vendorId]: false }));
    }
  };

  const handleDeleteModal = (ids: SelectedRowIdProp) => {
    setSelectedRowId(ids);
    deleteModalToggle();
  };

  const handleViewModal = (vendor: Vendor) => {
    setSelectedRowData(vendor);
    viewModalToggle();
  };

  const handleEditClick = async (id: number, selectedVendor: Vendor) => {
    try {
      setNavigating(true);
      await saveSelectedVendorId(id);
      dispatch(setSingleVendorData(selectedVendor));
      // dispatch(setNumberLevel(1));
      setTimeout(() => {
        navigate("/edit-vendor");
      }, 700);
    } catch (error) {
      toast.error("Failed to select the institution. Please try again.");
      console.error("Error in handleEditClick:", error);
      setNavigating(false);
    }
  };

  const ActionDataSource: React.FC<ActionDataSourceProp> = ({ data }) => {
    const vendorId = data.vendor_id;
    const isLoginEnabled = loginEnabledStates[vendorId] ?? false;
    const isLoading = toggleLoading[vendorId] ?? false;

    return (
      <div className="action simple-list tb-action-flex" key={data.id}>
        <button
          className="edge-btn btn-primary tb-action-button"
          onClick={() => handleViewModal(data)}
        >
          <i className="icon-eye" /> View
        </button>
        <button
          className="edge-btn btn-secondary tb-action-button"
          onClick={() => handleEditClick(vendorId, data)}
        >
          <i className="icon-pencil-alt" /> Edit
        </button>
        <button
          className="edge-btn btn-tertiary tb-action-button"
          onClick={() => handleDeleteModal({ vendor_id: vendorId })}
        >
          <i className="icon-trash" /> Delete
        </button>
        <button
          className={`edge-btn ${
            isLoginEnabled ? "btn-danger" : "btn-success"
          } tb-action-button`}
          onClick={() => handleToggleLogin(data)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <i className="fa fa-spin fa-spinner me-1" />
              Processing
            </>
          ) : (
            <>
              <i className={isLoginEnabled ? "icon-lock" : "icon-unlock"} />
              {isLoginEnabled ? "Disable" : "Enable"}
            </>
          )}
        </button>
      </div>
    );
  };

  const vendorManagementColumn: TableColumn<Vendor>[] = [
    { name: "Vendor Code", selector: (row) => row.vendor_code, sortable: true },
    {
      name: "Business Name",
      selector: (row) => row.business_name,
      sortable: true,
    },
    { name: "Location", selector: (row) => row.city, sortable: true },
    { name: "Mobile No", selector: (row) => row.phone, sortable: true },
    {
      name: "Action",
      cell: (row) => <ActionDataSource data={row} />,
      sortable: false,
      width: "35%",
    },
  ];

  const [filterText, setFilterText] = useState("");

  // ✅ Filter: by selected location (All = "") + search box
  const filteredItems = vendors.filter((item) => {
    const matchesLocation = !selectedLocation || item.city === selectedLocation;
    const haystack = `${item.business_name ?? ""} ${item.city ?? ""} ${
      item.phone ?? ""
    }`.toLowerCase();
    const matchesSearch = haystack.includes(filterText.toLowerCase());
    return matchesLocation && matchesSearch;
  });

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div
        id="basic-1_filter"
        className="dataTables_filter d-flex align-items-center"
      >
        <Label className="me-2">{SearchTableButton}:</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilterText(e.target.value)
          }
          type="search"
          value={filterText}
        />
      </div>
    );
  }, [filterText]);

  return (
    <>
      <ViewModal
        viewModalOpen={viewModalOpen}
        viewModalToggle={viewModalToggle}
        rowData={selectedRowData}
      />
      <DeleteModal
        deleteModalOpen={deleteModalOpen}
        deleteModalToggle={deleteModalToggle}
        rowId={selectedRowId}
        setReload={setReload}
        reload={reload}
      />
      {(loading || navigating) ? (
        <Loader />
      ) : (
        <div className="table-responsive">
          <DataTable
            columns={vendorManagementColumn}
            data={filteredItems}
            pagination
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            highlightOnHover
            striped
            responsive
          />
        </div>
      )}
    </>
  );
}

export default VendorsTab;
