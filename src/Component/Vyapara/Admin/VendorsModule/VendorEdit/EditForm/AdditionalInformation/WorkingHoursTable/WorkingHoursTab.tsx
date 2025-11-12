import React, { useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Input, Label } from "reactstrap";
import { useAppSelector } from "../../../../../../../../ReduxToolkit/Hooks";
import { WorkingHour } from "../../../../../../../../Type/Vyapara/Admin/Vendors/VendorManangement";
import DeleteModal from "./Modals/DeleteModal";
import EditModal from "./Modals/EditModal";
import axiosCall from "../../../../../../../../Api/APIcall";
import { toast } from "react-toastify";

interface ActionDataSourceProp {
  data: WorkingHour;
}

interface SelectedRowIdProp {
  vendor_id: number;
  hour_id: string;
  day?: string;
  open?: string;
  close?: string;
  is_closed?: number;
}

const WorkingHoursTab: React.FC = () => {
  const { singleVendorData } = useAppSelector((state) => state.vendorTab);

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const deleteModalToggle = () => setDeleteModalOpen(!deleteModalOpen);
  const [reload, setReload] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<SelectedRowIdProp | null>(
    null
  );

  // Edit Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const editModalToggle = () => setEditModalOpen(!editModalOpen);

  const handleEditHour = async (payload: {
    vendor_id: number;
    hour_id: string;
    day: string;
    open: string;
    close: string;
    is_closed: number;
  }) => {
    try {
      await axiosCall({
        ENDPOINT: "vendor/update/working-hours",
        METHOD: "POST",
        PAYLOAD: payload,
      });
      toast.success("Working hour updated successfully ✅");
      setReload(!reload);
      editModalToggle();
    } catch (error) {
      toast.error("Failed to update working hour ❌");
    }
  };

  const rows: WorkingHour[] = singleVendorData?.working_hours || [];

  const columns: TableColumn<WorkingHour>[] = [
    { name: "Day", selector: (row) => row.day, sortable: true },
    { name: "Open", selector: (row) => row.open, sortable: true },
    { name: "Close", selector: (row) => row.close, sortable: true },
    {
      name: "Is Closed",
      selector: (row) => (Number(row.is_closed) === 1 ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => <ActionDataSource data={row} />,
      sortable: false,
      width: "20%",
    },
  ];

  const handleDeleteModal = (ids: SelectedRowIdProp) => {
    setSelectedRowId(ids);
    deleteModalToggle();
  };

  const handleEditModal = (ids: SelectedRowIdProp) => {
    setSelectedRowId(ids);
    editModalToggle();
  };

  const ActionDataSource: React.FC<ActionDataSourceProp> = ({ data }) => {
    return (
      <div className="action simple-list tb-action-flex" key={data.id}>
        <button
          className="edge-btn btn-primary tb-action-button"
          onClick={() => {
            console.log("Material row:", data);
            handleEditModal({
              vendor_id: Number(singleVendorData!.vendor_id),
              hour_id: data?.id,
              day: data?.day,
              open: data?.open,
              close: data?.close,
              is_closed: data?.is_closed,
            });
          }}
        >
          <i className="icon-pencil-alt" /> Edit
        </button>
        <button
          className="edge-btn btn-danger tb-action-button"
          onClick={() => {
            console.log("Material row:", data);
            handleDeleteModal({
              vendor_id: Number(singleVendorData!.vendor_id),
              hour_id: data?.id,
            });
          }}
        >
          <i className="icon-trash" /> Delete
        </button>
      </div>
    );
  };

  const [filterText, setFilterText] = useState("");

  const filteredItems = rows.filter((r) =>
    (r.day || "").toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div className="dataTables_filter d-flex align-items-center">
        <Label className="me-2">Search:</Label>
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

  if (!singleVendorData) return null;

  return (
    <>
      <DeleteModal
        deleteModalOpen={deleteModalOpen}
        deleteModalToggle={deleteModalToggle}
        rowId={selectedRowId}
        setReload={setReload}
        reload={reload}
      />
      <EditModal
        isOpen={editModalOpen}
        toggle={editModalToggle}
        selectedHour={
          selectedRowId
            ? {
                vendor_id: selectedRowId.vendor_id,
                hour_id: selectedRowId.hour_id,
                day: selectedRowId.day ?? "",
                open: selectedRowId.open ?? "",
                close: selectedRowId.close ?? "",
                is_closed: selectedRowId.is_closed ?? 0,
              }
            : null
        }
        onSave={handleEditHour}
      />
      <div className="table-responsive">
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          // subHeader
          subHeaderComponent={subHeaderComponentMemo}
          highlightOnHover
          striped
          responsive
        />
      </div>
    </>
  );
};

export default WorkingHoursTab;
