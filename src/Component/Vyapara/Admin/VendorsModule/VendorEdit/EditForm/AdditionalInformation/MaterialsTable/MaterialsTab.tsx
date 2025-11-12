import React, { useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Input, Label } from "reactstrap";
import { useAppSelector } from "../../../../../../../../ReduxToolkit/Hooks";
import { Material } from "../../../../../../../../Type/Vyapara/Admin/Vendors/VendorManangement";
import DeleteModal from "./Modals/DeleteModal";
import EditModal from "./Modals/EditModal";
import { toast } from "react-toastify";
import axiosCall from "../../../../../../../../Api/APIcall";

interface ActionDataSourceProp {
  data: Material;
}

interface SelectedRowIdProp {
  vendor_id: number;
  material_id: string;
  name?: string;
}

const MaterialsTab: React.FC = () => {
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

  const handleEditMaterial = async (payload: {
    vendor_id: number;
    material_id: string;
    name: string;
  }) => {
    try {
      await axiosCall({
        ENDPOINT: "vendor/update/material",
        METHOD: "POST",
        PAYLOAD: payload,
      });
      toast.success("Material updated successfully ✅");
      setReload(!reload); // trigger table reload
      editModalToggle();
    } catch (error) {
      toast.error("Failed to update material ❌");
    }
  };

  const materials: Material[] = singleVendorData?.materials || [];

  const columns: TableColumn<Material>[] = [
    { name: "Material Name", selector: (row) => row.name, sortable: true },
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
              material_id: data?.id,
              name: data?.name,
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
              material_id: data?.id,
            });
          }}
        >
          <i className="icon-trash" /> Delete
        </button>
      </div>
    );
  };

  const [filterText, setFilterText] = useState("");

  const filteredItems = materials.filter((m) =>
    (m.name || "").toLowerCase().includes(filterText.toLowerCase())
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
        selectedMaterial={
          selectedRowId
            ? {
                vendor_id: selectedRowId.vendor_id,
                material_id: selectedRowId.material_id,
                name: selectedRowId.name ?? "",
              }
            : null
        }
        onSave={handleEditMaterial}
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

export default MaterialsTab;
