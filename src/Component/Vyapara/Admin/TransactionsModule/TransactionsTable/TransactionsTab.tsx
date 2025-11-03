import React, { useMemo, useState } from "react";
import { SearchTableButton } from "../../../../../utils/Constant";
import { Input, Label } from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { TransactionsTabType } from "../../../../../Type/Vyapara/Admin/Transactions/Transactions";

// ✅ Accept selectedStatus as prop
interface PurTabProps {
  selectedStatus: number;
}

interface ActionDataSourceProp {
  data: TransactionsTabType;
}

function TransactionsTab({ selectedStatus }: PurTabProps) {
  const TransactionTabBodyData = [
    {
      id: 1,
      transId: "PUR-102938",
      user: "Elle Amberson",
      transType: "Digital Purchase",
      status: "Completed",
      amount: "₹55,100",
      date: "23-05-2024",
      action: "t-1",
    },
    {
      id: 2,
      transId: "DEP-374829",
      user: "Laura Dagson",
      transType: "Deposit",
      status: "Completed",
      amount: "₹55,100",
      date: "23-05-2024",
      action: "t-1",
    },
    {
      id: 3,
      transId: "ORD-918273",
      user: "Rachel Green",
      transType: "Order",
      status: "Delivered",
      amount: "₹55,100",
      date: "23-05-2024",
      action: "t-1",
    },
  ];

  const ActionDataSource: React.FC<ActionDataSourceProp> = ({ data }) => (
    <div className="action simple-list tb-action-flex" key={data.id}>
      <button
        className="edge-btn btn-primary tb-action-button"
        id={`btn-3`}
        // onClick={() => handleViewModal(data)}
      >
        <i className="icon-eye" /> View
      </button>
    </div>
  );

  const transactionColumn: TableColumn<TransactionsTabType>[] = [
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
      name: "Transaction ID",
      selector: (row) => `${row.transId}`,
      sortable: true,
    },
    {
      name: "Transaction Type",
      selector: (row) => `${row.transType}`,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => `${row.amount}`,
      sortable: true,
    },
    // {
    //   name: "Status",
    //   selector: (row) => `${row.status}`,
    //   sortable: true,
    // },
    {
      name: "Date",
      selector: (row) => `${row.date}`,
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
  const statusMap: Record<number, string> = {
    1: "Digital Purchase",
    2: "Order",
    3: "Deposit",
  };

  // ✅ Filter by both search & selected status
  const filteredItems = TransactionTabBodyData.filter((item) => {
    const matchesStatus =
      selectedStatus === 0 || item.transType === statusMap[selectedStatus];
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
      <div className="table-responsive">
        <DataTable
          columns={transactionColumn}
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

export default TransactionsTab;
