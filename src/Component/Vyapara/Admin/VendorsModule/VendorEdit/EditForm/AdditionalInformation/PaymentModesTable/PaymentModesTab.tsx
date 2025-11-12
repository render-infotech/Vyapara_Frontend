import React, { useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Input, Label } from "reactstrap";
import { useAppSelector } from "../../../../../../../../ReduxToolkit/Hooks";
import DeleteModal from "./Modals/DeleteModal";

interface PaymentModeRow {
  id: number;
  mode: string;
}

interface ActionDataSourceProp {
  data: PaymentModeRow;
}

interface SelectedRowIdProp {
  vendor_id: number;
  mode: string;
}

const PaymentModesTab: React.FC = () => {
  const { singleVendorData } = useAppSelector((state) => state.vendorTab);

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const deleteModalToggle = () => setDeleteModalOpen(!deleteModalOpen);
  const [reload, setReload] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<{
    vendor_id: number;
    mode: string;
  } | null>(null);

  const rows: PaymentModeRow[] = (singleVendorData?.payment_modes || []).map(
    (m: any, idx: number) => {
      const modeStr = typeof m === "string" ? m : (m?.mode ?? "");
      return { id: idx + 1, mode: modeStr } as PaymentModeRow;
    }
  );

  const columns: TableColumn<PaymentModeRow>[] = [
    { name: "Payment Mode", selector: (row) => row.mode, sortable: true },
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

  const ActionDataSource: React.FC<ActionDataSourceProp> = ({ data }) => {
    return (
      <div className="action simple-list tb-action-flex" key={data.id}>
        {/* <button className="edge-btn btn-primary tb-action-button">
          <i className="icon-pencil-alt" /> Update
        </button> */}
        <button
          className="edge-btn btn-danger tb-action-button"
          onClick={() => {
            console.log("Material row:", data);
            handleDeleteModal({
              vendor_id: Number(singleVendorData!.vendor_id),
              mode: data?.mode,
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
    String(r.mode || "").toLowerCase().includes(filterText.toLowerCase())
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

export default PaymentModesTab;
