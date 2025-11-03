import React, { useMemo, useState } from "react";
import { SearchTableButton } from "../../../../../utils/Constant";
import { Input, Label } from "reactstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { Vendor } from "../../../../../Type/Vyapara/Admin/Vendors/VendorManangement";
import Loader from "../../../Loader/Loader";

interface ActionDataSourceProp {
  data: Vendor;
}

interface PurTabProps {
  selectedLocation: string; // empty string means All
  vendors: Vendor[];
  loading: boolean;
}

function VendorsTab({ selectedLocation, vendors, loading }: PurTabProps) {

  const ActionDataSource: React.FC<ActionDataSourceProp> = ({ data }) => (
    <div className="action simple-list tb-action-flex" key={data.id}>
      <button className="edge-btn btn-primary tb-action-button">
        <i className="icon-eye" /> View
      </button>
      <button className="edge-btn btn-secondary tb-action-button">
        <i className="icon-pencil-alt" /> Edit
      </button>
      <button className="edge-btn btn-tertiary tb-action-button">
        <i className="icon-trash" /> Delete
      </button>
    </div>
  );

  const vendorManagementColumn: TableColumn<Vendor>[] = [
    { name: "Vendor Code", selector: (row) => row.vendor_code, sortable: true },
    { name: "Business Name", selector: (row) => row.business_name, sortable: true },
    { name: "Location", selector: (row) => row.city, sortable: true },
    { name: "Mobile No", selector: (row) => row.phone, sortable: true },
    {
      name: "Action",
      cell: (row) => <ActionDataSource data={row} />,
      sortable: false,
      width: "25%",
    },
  ];

  const [filterText, setFilterText] = useState("");

  // ✅ Filter: by selected location (All = "") + search box
  const filteredItems = vendors.filter((item) => {
    const matchesLocation = !selectedLocation || item.city === selectedLocation;
    const haystack = `${item.business_name ?? ""} ${item.city ?? ""} ${item.phone ?? ""}`.toLowerCase();
    const matchesSearch = haystack.includes(filterText.toLowerCase());
    return matchesLocation && matchesSearch;
  });

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div id="basic-1_filter" className="dataTables_filter d-flex align-items-center">
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
    {loading ? (
      <Loader />
    ) : (
      <div className="table-responsive">
        <DataTable
          columns={vendorManagementColumn}
          data={filteredItems}
          pagination
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          highlightOnHover
          striped
          responsive
        />
      </div>
    )}
    </>
  );
}

export default VendorsTab;
