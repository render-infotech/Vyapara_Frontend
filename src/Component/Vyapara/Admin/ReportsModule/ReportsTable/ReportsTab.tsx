import React, { useMemo, useState } from "react";
import { Input, Label } from "reactstrap";
import { SearchTableButton } from "../../../../../utils/Constant";
import DataTable, { TableColumn } from "react-data-table-component";
import { ReportsTabType } from "../../../../../Type/Vyapara/Admin/Reports/Reports";

interface PurTabProps {
  selectedStatus: number;
  selectedDateRange: string;
}

interface ActionDataSourceProp {
  data: ReportsTabType;
}

function ReportsTab({ selectedStatus, selectedDateRange }: PurTabProps) {
  const ReportsTabBodyData = [
    {
      id: 1,
      category: "Gold",
      revenue: "1.2 L",
      startDate: "01-01-2025",
      endDate: "31-12-2025",
      dateRange: "Yearly",
      action: "t-1",
    },
    {
      id: 2,
      category: "Gold",
      revenue: "10k",
      startDate: "01-10-2025",
      endDate: "31-10-2025",
      dateRange: "Monthly",
      action: "t-2",
    },
    {
      id: 3,
      category: "Silver",
      revenue: "2k",
      startDate: "07-10-2025",
      endDate: "13-10-2025",
      dateRange: "Weekly",
      action: "t-3",
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

  const reportManagementColumn: TableColumn<ReportsTabType>[] = [
    {
      name: "Metal",
      selector: (row) => `${row.category}`,
      sortable: true,
    },
    {
      name: "Revenue",
      selector: (row) => `${row.revenue}`,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => `${row.startDate}`,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => `${row.endDate}`,
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
  const statusMap: Record<number, string> = {
    1: "Gold",
    2: "Silver",
  };

  const filteredItems = ReportsTabBodyData.filter((item) => {
    const matchesStatus =
      selectedStatus === 0 || item.category === statusMap[selectedStatus];

    const matchesDateRange =
      !selectedDateRange || item.dateRange === selectedDateRange;

    const matchesSearch = item.category
      .toLowerCase()
      .includes(filterText.toLowerCase());

    return matchesStatus && matchesDateRange && matchesSearch;
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
    <div className="table-responsive">
      <DataTable
        columns={reportManagementColumn}
        data={filteredItems}
        pagination
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        highlightOnHover
        striped
      />
    </div>
  );
}

export default ReportsTab;
