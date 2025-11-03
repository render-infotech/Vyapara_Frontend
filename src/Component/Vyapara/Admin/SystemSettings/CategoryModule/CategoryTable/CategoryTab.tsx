import React, { useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { SearchTableButton } from "../../../../../../utils/Constant";
import { Input, Label } from "reactstrap";
import { CategoryTabType } from "../../../../../../Type/Vyapara/Admin/SystemSettings/CategoryManagement/CategoryManagement";

interface ActionDataSourceProp {
  data: CategoryTabType;
}

function CategoryTab() {
  const CategoryTabBodyData = [
    {
      id: 1,
      cId: 1,
      category: "Coin",
      metal: "Gold",
      action: "t-1",
    },
    {
      id: 2,
      cId: 2,
      category: "Bar",
      metal: "Gold",
      action: "t-2",
    },
    {
      id: 3,
      cId: 3,
      category: "Biscuit",
      metal: "Gold",
      action: "t-3",
    },
    {
      id: 4,
      cId: 4,
      category: "Bar",
      metal: "Silver",
      action: "t-4",
    },
    {
      id: 5,
      cId: 5,
      category: "Coin",
      metal: "Silver",
      action: "t-4",
    },
  ];

  const ActionDataSource: React.FC<ActionDataSourceProp> = ({ data }) => (
    <div className="action simple-list tb-action-flex" key={data.id}>
      <button
        className="edge-btn btn-primary tb-action-button"
        id={`btn-3`}
        // onClick={() => handleViewModal(data)}
      >
        <i className="icon-pencil-alt" /> Edit
      </button>
      <button
        className="edge-btn btn-tertiary tb-action-button"
        id={`btn-3`}
        // onClick={() => handleViewModal(data)}
      >
        <i className="icon-trash" /> Delete
      </button>
    </div>
  );

  const categoryManagementColumn: TableColumn<CategoryTabType>[] = [
    {
      name: "Category ID",
      selector: (row) => `${row.cId}`,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Metal",
      selector: (row) => row.metal,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => <ActionDataSource data={row} />,
      sortable: true,
      width: "20%",
    },
  ];
  const [filterText, setFilterText] = useState("");
  const filteredItems = CategoryTabBodyData.filter(
    (item) =>
      item.category && item.category.toLowerCase().includes(filterText.toLowerCase())
  );
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
        columns={categoryManagementColumn}
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

export default CategoryTab;
