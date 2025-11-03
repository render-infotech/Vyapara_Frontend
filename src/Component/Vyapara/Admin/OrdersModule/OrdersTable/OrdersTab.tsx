import React, { useMemo, useState } from "react";
import { Input, Label } from "reactstrap";
import { SearchTableButton } from "../../../../../utils/Constant";
import DataTable, { TableColumn } from "react-data-table-component";
import { OrdersTabType } from "../../../../../Type/Vyapara/Admin/Orders/OrderManagement";
import ViewModal from "./Modal/ViewModal";

// ✅ Accept selectedStatus as prop
interface PurTabProps {
  selectedStatus: number;
}

interface ActionDataSourceProp {
  data: OrdersTabType;
}

function OrdersTab({ selectedStatus }: PurTabProps) {
  const [selectedRowData, setSelectedRowData] = useState<OrdersTabType | null>(
    null
  );

  // View Modal
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const viewModalToggle = () => setViewModalOpen(!viewModalOpen);

  const OrdersTabBodyData = [
    {
      id: 1,
      orderId: "ORD-918273",
      user: "Elle Amberson",
      metal: "Gold",
      products: [
        {
          id: 1,
          category: "Gold Coin",
          weight: "5g",
        },
        {
          id: 2,
          category: "Gold Bar",
          weight: "5g",
        },
      ],
      vendor: "Chennai Gold Palace",
      amount: "₹55,100",
      status: "In Transit",
      date: "23-05-2024",
      action: "t-1",
    },
    {
      id: 2,
      orderId: "ORD-564738",
      user: "Anna Catmire",
      metal: "Silver",
      products: [
        {
          id: 1,
          category: "Silver Coin",
          weight: "5g",
        },
        {
          id: 2,
          category: "Silver Bar",
          weight: "5g",
        },
      ],
      vendor: "Delhi Gold House",
      amount: "₹1,55,100",
      status: "Cancelled",
      date: "23-05-2024",
      action: "t-2",
    },
    {
      id: 3,
      orderId: "ORD-293847",
      metal: "Silver",
      user: "Laura Dagson",
      products: [
        {
          id: 1,
          category: "Silver Coin",
          weight: "5g",
        },
        // {
        //   id: 2,
        //   category: "Silver Bar",
        //   weight: "5g",
        // },
      ],
      vendor: "Mumbai Jewellers",
      amount: "₹1,15,100",
      status: "Delivered",
      date: "23-05-2024",
      action: "t-3",
    },
    {
      id: 4,
      orderId: "ORD-847561",
      user: "Rachel Green",
      metal: "Gold",
      products: [
        {
          id: 1,
          category: "Gold Coin",
          weight: "5g",
        },
        {
          id: 2,
          category: "Gold Bar",
          weight: "5g",
        },
      ],
      vendor: "Mumbai Jewellers",
      amount: "₹55,100",
      status: "In Transit",
      date: "23-05-2024",
      action: "t-4",
    },
  ];

  const handleViewModal = (data: OrdersTabType) => {
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

  const orderManagementColumn: TableColumn<OrdersTabType>[] = [
    {
      name: "ID",
      selector: (row) => `${row.id}`,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => `${row.user}`,
      sortable: true,
      // width: "12%",
    },
    {
      name: "Order ID",
      selector: (row) => `${row.orderId}`,
      sortable: true,
    },
    // {
    //   name: "Products",
    //   selector: (row) => `${row.products}`,
    //   sortable: true,
    //   width: "12%",
    // },
    // {
    //   name: "Vendor",
    //   selector: (row) => `${row.vendor}`,
    //   sortable: true,
    //   width: "14%",
    // },
    {
      name: "Price",
      selector: (row) => `${row.amount}`,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => `${row.status}`,
      sortable: true,
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
    },
  ];

  const [filterText, setFilterText] = useState("");

  // ✅ Convert selectedStatus number to matching status string
  const statusMap: Record<number, string> = {
    1: "Delivered",
    2: "In Transit",
    3: "Cancelled",
  };

  // ✅ Filter by both search & selected status
  const filteredItems = OrdersTabBodyData.filter((item) => {
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
          columns={orderManagementColumn}
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

export default OrdersTab;
