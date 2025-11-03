import React, { useMemo, useState } from "react";
import { DigPurchaseTabType } from "../../../../../Type/Vyapara/Admin/DigPurchases/DigPurchases";
import DataTable, { TableColumn } from "react-data-table-component";
import { Input, Label } from "reactstrap";
import { SearchTableButton } from "../../../../../utils/Constant";
import ViewModal from "./Modal/ViewModal";

// ✅ Accept selectedStatus as prop
interface PurTabProps {
  selectedStatus: number;
}

interface ActionDataSourceProp {
  data: DigPurchaseTabType;
}

function PurTab({ selectedStatus }: PurTabProps) {
  const [selectedRowData, setSelectedRowData] =
    useState<DigPurchaseTabType | null>(null);

  // View Modal
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const viewModalToggle = () => setViewModalOpen(!viewModalOpen);

  const DigPurchTabBodyData = [
    {
      id: 1,
      purId: "PUR-102938",
      user: "Elle Amberson",
      metal: "Gold",
      weight: "20g",
      status: "Completed",
      amount: "₹55,100",
      date: "23-05-2024",
    },
    {
      id: 2,
      purId: "PUR-847362",
      user: "Anna Catmire",
      metal: "Gold",
      weight: "20g",
      status: "Completed",
      amount: "₹55,100",
      date: "23-05-2024",
    },
    {
      id: 3,
      purId: "PUR-564738",
      user: "Laura Dagson",
      metal: "Silver",
      weight: "20g",
      status: "Pending",
      amount: "₹55,100",
      date: "23-05-2024",
    },
    {
      id: 4,
      purId: "PUR-192837",
      user: "Rachel Green",
      metal: "Silver",
      weight: "20g",
      status: "Failed",
      amount: "₹55,100",
      date: "23-05-2024",
    },
  ];

  const handleViewModal = (data: DigPurchaseTabType) => {
    setSelectedRowData(data);
    viewModalToggle();
  };

  const ActionDataSource: React.FC<ActionDataSourceProp> = ({ data }) => (
    <div className="action simple-list tb-action-flex" key={data.id}>
      <button
        className="edge-btn btn-primary tb-action-button"
        id={`btn-3`}
        onClick={() => handleViewModal(data)}
      >
        <i className="icon-eye" /> View
      </button>
    </div>
  );

  const digPurcColumn: TableColumn<DigPurchaseTabType>[] = [
    {
      name: "ID",
      selector: (row) => `${row.id}`,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => `${row.user}`,
      sortable: true,
    },
    {
      name: "Purchase ID",
      selector: (row) => `${row.purId}`,
      sortable: true,
    },
    {
      name: "Inv. Amount",
      selector: (row) => `${row.amount}`,
      sortable: true,
      // width: "12%",
    },
    {
      name: "Status",
      selector: (row) => `${row.status}`,
      sortable: true,
      // width: "12%",
    },
    {
      name: "Date",
      selector: (row) => `${row.date}`,
      sortable: true,
      // width: "12%",
    },
    {
      name: "Action",
      cell: (row) => <ActionDataSource data={row} />,
      sortable: true,
      width: "10%",
      // center: true,
    },
  ];

  const [filterText, setFilterText] = useState("");

  // ✅ Convert selectedStatus number to matching status string
  const statusMap: Record<number, string> = {
    1: "Completed",
    2: "Pending",
    3: "Failed",
  };

  // ✅ Filter by both search & selected status
  const filteredItems = DigPurchTabBodyData.filter((item) => {
    const matchesStatus =
      selectedStatus === 0 || item.status === statusMap[selectedStatus];
    const matchesSearch = item.user
      .toLowerCase()
      .includes(filterText.toLowerCase());

    return matchesStatus && matchesSearch;
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
      <div className="table-responsive">
        <DataTable
          columns={digPurcColumn}
          data={filteredItems}
          pagination
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          highlightOnHover
          striped
        />
      </div>
    </>
  );
}

export default PurTab;
