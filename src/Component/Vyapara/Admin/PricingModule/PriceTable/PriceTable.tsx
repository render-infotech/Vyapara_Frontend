import React, { useMemo, useState } from "react";
import { PricingTabType } from "../../../../../Type/Vyapara/Admin/Pricing/PricingManagement";
import DataTable, { TableColumn } from "react-data-table-component";
import { Input, Label } from "reactstrap";
import { SearchTableButton } from "../../../../../utils/Constant";

interface ActionDataSourceProp {
  data: PricingTabType;
}

interface PurTabProps {
  selectedStatus: number;
}

function PriceTable({ selectedStatus }: PurTabProps) {
  const PricingTabBodyData = [
    {
      id: 1,
      metal: "Gold",
      livRate: 6850,
      adminComm: 0,
      finPrice: 6850,
      action: "t-1",
    },
    {
      id: 2,
      metal: "Silver",
      livRate: 4300,
      adminComm: 0,
      finPrice: 4300,
      action: "t-2",
    },
  ];

  const ActionDataSource: React.FC<ActionDataSourceProp> = ({ data }) => (
    <div className="action simple-list tb-action-flex" key={data.id}>
      <button
        className="edge-btn btn-primary tb-action-button"
        id={`btn-3`}
        // onClick={() => handleViewModal(data)}
      >
        <i className="icon-reload" /> Sync
      </button>
      <button
        className="edge-btn btn-tertiary tb-action-button"
        id={`btn-3`}
        // onClick={() => handleViewModal(data)}
      >
        <i className="fa fa-save" /> Save
      </button>
    </div>
  );

  const [data, setData] = useState(
    PricingTabBodyData.map((item) => ({
      ...item,
      adminComm: item.adminComm.toString(),
    }))
  );

  const handleAdminCommChange = (id: number, value: string) => {
    const updated = data.map((item) => {
      if (item.id === id) {
        const percent = parseFloat(value) || 0;
        const finPrice = item.livRate + (item.livRate * percent) / 100;
        return { ...item, adminComm: value, finPrice };
      }
      return item;
    });
    setData(updated);
  };

  const pricingManagementColumn: TableColumn<PricingTabType>[] = [
    {
      name: "Metal",
      selector: (row) => row.metal,
      sortable: true,
    },
    {
      name: "Live Rate (per gram)",
      selector: (row) => row.livRate,
      sortable: true,
    },
    {
      name: "Admin Commission (%)",
      cell: (row) => (
        <div className="dataTables_filter">
          <Input
            type="number"
            value={row.adminComm}
            onChange={(e) => handleAdminCommChange(row.id, e.target.value)}
            style={{
              width: "50%",
            }}
          />
        </div>
      ),
      sortable: false,
    },
    {
      name: "Final Selling Price (per gram)",
      selector: (row) => row.finPrice.toFixed(2),
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

  const statusMap: Record<number, string> = {
    1: "Gold",
    2: "Silver",
  };

  const filteredItems = data.filter((item) => {
    const matchesStatus =
      selectedStatus === 0 || item.metal === statusMap[selectedStatus];
    const matchesSearch = item.metal
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
          columns={pricingManagementColumn}
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

export default PriceTable;
