import React, { useMemo, useState } from "react";
import { Input, Label } from "reactstrap";
import { SearchTableButton } from "../../../../../utils/Constant";
import DataTable, { TableColumn } from "react-data-table-component";
import { DepositsTabType } from "../../../../../Type/Vyapara/Admin/Deposits/DepositManagement";
import ViewModal from "./Modal/ViewModal";

// ✅ Accept selectedStatus as prop
interface PurTabProps {
  selectedStatus: number;
}

interface ActionDataSourceProp {
  data: DepositsTabType;
}

function DepositsTab({ selectedStatus }: PurTabProps) {
  const [selectedRowData, setSelectedRowData] =
    useState<DepositsTabType | null>(null);

  // View Modal
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const viewModalToggle = () => setViewModalOpen(!viewModalOpen);

  const DepositsTabBodyData = [
    {
      id: 1,
      depositId: "DEP-374829",
      customer: "Elle Amberson",
      vendor: "Mumbai Jewellers",
      category: [
        {
          depositType: "Gold Deposit",
          products: [
            { id: 1, name: "Gold Coin", purity: "22K", weight: "10g" },
            { id: 2, name: "Gold Bar", purity: "9K", weight: "50g" },
            { id: 3, name: "Gold Bar", purity: "9K", weight: "50g" },
            { id: 4, name: "Gold Bar", purity: "9K", weight: "50g" },
            { id: 5, name: "Gold Bar", purity: "9K", weight: "50g" },
          ],
        },
      ],
      value: "₹1,75,000",
      status: "Pending Verification",
      date: "23-05-2024",
      action: "t-1",
    },
    {
      id: 2,
      depositId: "DEP-918264",
      customer: "Anna Catmire",
      vendor: "Delhi Jewellers",
      category: [
        {
          depositType: "Gold Deposit",
          products: [
            { id: 1, name: "Gold Coin", purity: "22K", weight: "10g" },
            { id: 2, name: "Gold Bar", purity: "9K", weight: "50g" },
          ],
        },
      ],
      value: "₹1,75,000",
      status: "Pending Verification",
      date: "23-05-2024",
      action: "t-2",
    },
    {
      id: 3,
      depositId: "DEP-562738",
      customer: "Laura Dagson",
      vendor: "Hyderabad Jewellers",
      category: [
        {
          depositType: "Silver Deposit",
          products: [
            { id: 1, name: "Silver Coin", purity: "999", weight: "20g" },
          ],
        },
      ],
      value: "₹1,75,000",
      status: "Verified",
      date: "23-05-2024",
      action: "t-3",
    },
    {
      id: 4,
      depositId: "DEP-193847",
      customer: "Rachel Green",
      vendor: "Kolkata Jewellers",
      category: [
        {
          depositType: "Silver Deposit",
          products: [
            { id: 1, name: "Silver Coin", purity: "999", weight: "20g" },
          ],
        },
      ],
      value: "₹1,75,000",
      status: "Rejected",
      date: "23-05-2024",
      action: "t-4",
    },
  ];

  const handleViewModal = (data: DepositsTabType) => {
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

  const depositManagementColumn: TableColumn<DepositsTabType>[] = [
    {
      name: "ID",
      selector: (row) => row?.id,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row?.customer,
      sortable: true,
      // width: "12%",
    },
    {
      name: "Deposit ID",
      selector: (row) => row?.depositId,
      sortable: true,
    },
    {
      name: "Vendor",
      selector: (row) => row?.vendor,
      sortable: true,
      // width: "15%",
    },
    {
      name: "Category",
      selector: (row) => row.category.map((c) => c.depositType).join("\n"),
      sortable: true,
      cell: (row) => (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {row.category.map((c) => c.depositType).join(`,${"\n"}`)}
        </div>
      ),
      // width: "12%",
    },
    // {
    //   name: "Weight (grams)",
    //   selector: (row) => row?.weight,
    //   sortable: true,
    // },
    // {
    //   name: "Value (₹)",
    //   selector: (row) => row?.value,
    //   sortable: true,
    // },
    // {
    //   name: "Status",
    //   selector: (row) => row?.status,
    //   sortable: true,
    //   // center: true,
    // },
    {
      name: "Date",
      selector: (row) => row?.date,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => <ActionDataSource data={row} />,
      sortable: true,
      width: "10%",
    },
  ];

  const [filterText, setFilterText] = useState("");

  // ✅ Convert selectedStatus number to matching status string
  const categoryMap: Record<number, string[]> = {
    0: [],
    1: ["Gold Deposit"],
    2: ["Silver Deposit"],
  };

  // ✅ Filter by both search & selected status
  const filteredItems = DepositsTabBodyData.filter((item) => {
    const categories = item.category.map((c) => c.depositType);

    // Check selectedStatus
    const selectedCategories = categoryMap[selectedStatus];

    const matchesCategory =
      selectedCategories.length === 0 || // 0 = show all
      selectedCategories.every((cat) => categories.includes(cat));

    const matchesSearch = item.customer
      .toLowerCase()
      .includes(filterText.toLowerCase());

    return matchesCategory && matchesSearch;
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
          columns={depositManagementColumn}
          data={filteredItems}
          pagination
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          highlightOnHover
          striped
          responsive
        />
      </div>
    </>
  );
}

export default DepositsTab;
