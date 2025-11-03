import React, { useMemo, useState } from "react";
import { Input, Label } from "reactstrap";
import { SearchTableButton } from "../../../../../utils/Constant";
import DataTable, { TableColumn } from "react-data-table-component";
import { ProductsTabType } from "../../../../../Type/Vyapara/Admin/Products/ProductManagement";

// ✅ Accept selectedStatus as prop
interface PurTabProps {
  selectedStatus: number;
}

interface ActionDataSourceProp {
  data: ProductsTabType;
}

function ProductsTab({ selectedStatus }: PurTabProps) {
  const ProductsTabBodyData = [
    {
      id: 1,
      prodId: "#IH63390",
      name: "24K Gold Coin",
      category: "Coin",
      weight: "10g",
      metal: "Gold",
      action: "t-1",
    },
    {
      id: 2,
      prodId: "#F749U8",
      name: "999 Silver Bar",
      category: "Bar",
      weight: "50g",
      metal: "Silver",
      action: "t-2",
    },
    {
      id: 3,
      prodId: "#RT5094",
      name: "24K Gold Bar",
      category: "Bar",
      weight: "10g",
      metal: "Gold",
      action: "t-3",
    },
    {
      id: 4,
      prodId: "#PZ7384",
      name: "999 Silver Biscuit",
      category: "Biscuit",
      weight: "20g",
      metal: "Silver",
      action: "t-4",
    },
  ];

  const ActionDataSource: React.FC<ActionDataSourceProp> = ({ data }) => (
    <div className="action simple-list tb-action-flex" key={data.id}>
      <button
        className="edge-btn btn-tertiary tb-action-button"
        id={`btn-3`}
        // onClick={() => handleViewModal(data)}
      >
        <i className="icon-pencil-alt" /> Edit
      </button>
      <button
        className="edge-btn btn-danger tb-action-button"
        id={`btn-3`}
        // onClick={() => handleViewModal(data)}
      >
        <i className="icon-trash" /> Delete
      </button>
    </div>
  );

  const productManagementColumn: TableColumn<ProductsTabType>[] = [
    {
      name: "Product ID",
      selector: (row) => `${row.prodId}`,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => `${row.name}`,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => `${row.category}`,
      sortable: true,
    },
    {
      name: "Metal",
      selector: (row) => `${row.metal}`,
      sortable: true,
    },
    {
      name: "Weight",
      selector: (row) => `${row.weight}`,
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

  // ✅ Convert selectedStatus number to matching status string
  const statusMap: Record<number, string> = {
    1: "Gold",
    2: "Silver",
  };

  // ✅ Filter by both search & selected status
  const filteredItems = ProductsTabBodyData.filter((item) => {
    const matchesStatus =
      selectedStatus === 0 || item.metal === statusMap[selectedStatus];
    const matchesSearch = item.name
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
          columns={productManagementColumn}
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

export default ProductsTab;
