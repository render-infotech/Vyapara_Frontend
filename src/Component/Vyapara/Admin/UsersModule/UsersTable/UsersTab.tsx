import React, { useMemo, useState } from "react";
import { Input, Label } from "reactstrap";
import { SearchTableButton } from "../../../../../utils/Constant";
import DataTable, { TableColumn } from "react-data-table-component";
import { UserManagementTabType } from "../../../../../Type/Vyapara/Admin/Users/UserManagement";
import ViewModal from "./Modal/ViewModal";

interface ActionDataSourceProp {
  data: UserManagementTabType;
}

function UsersTab() {
  const [filterText, setFilterText] = useState("");
  const [selectedRowData, setSelectedRowData] =
    useState<UserManagementTabType | null>(null);

  // View Modal
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const viewModalToggle = () => setViewModalOpen(!viewModalOpen);

  const UsersTabBodyData = [
    {
      id: 1,
      userId: "#IH63390",
      name: "Elle Amberson",
      email: "Elle34@gmail.com",
      aadhar: "123456789",
      mobNo: "1234123412",
      kycstatus: "Approved",
      holdingsValue: {
        dGold: 50000,
        dSilver: 5100,
        total: 55100,
      },
      addresses: [
        {
          id: 1,
          line1: "123 Gold Street",
          line2: "Near Diamond Plaza",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
        },
        {
          id: 2,
          line1: "456 Silver Avenue",
          city: "Pune",
          state: "Maharashtra",
          pincode: "411001",
        },
      ],
      isActive: true,
      action: "t-1",
    },
    {
      id: 2,
      userId: "#F749U8",
      name: "Anna Catmire",
      email: "Anna12@gmail.com",
      aadhar: "123456789",
      mobNo: "1234123412",
      kycstatus: "Approved",
      holdingsValue: {
        dGold: 50000,
        dSilver: 5100,
        total: 55100,
      },
      addresses: [
        {
          id: 1,
          line1: "123 Gold Street",
          line2: "Near Diamond Plaza",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
        },
        // {
        //   id: 2,
        //   line1: "456 Silver Avenue",
        //   city: "Pune",
        //   state: "Maharashtra",
        //   pincode: "411001",
        // },
      ],
      isActive: true,
      action: "t-2",
    },
    {
      id: 3,
      userId: "#RT5094",
      name: "Laura Dagson",
      email: "Laura@gmail.com",
      aadhar: "123456789",
      mobNo: "1234123412",
      kycstatus: "Pending",
      holdingsValue: {
        dGold: 50000,
        dSilver: 5100,
        total: 55100,
      },
      addresses: [
        {
          id: 1,
          line1: "123 Gold Street",
          line2: "Near Diamond Plaza",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
        },
        // {
        //   id: 2,
        //   line1: "456 Silver Avenue",
        //   city: "Pune",
        //   state: "Maharashtra",
        //   pincode: "411001",
        // },
      ],
      isActive: false,
      action: "t-3",
    },
    {
      id: 4,
      userId: "#PZ7384",
      name: "Rachel Green",
      email: "Rache87@gmail.com",
      aadhar: "123456789",
      mobNo: "1234123412",
      kycstatus: "Pending",
      holdingsValue: {
        dGold: 50000,
        dSilver: 5100,
        total: 55100,
      },
      addresses: [
        {
          id: 1,
          line1: "123 Gold Street",
          line2: "Near Diamond Plaza",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
        },
        {
          id: 2,
          line1: "456 Silver Avenue",
          city: "Pune",
          state: "Maharashtra",
          pincode: "411001",
        },
      ],
      isActive: true,
      action: "t-4",
    },
  ];

  const [userData, setUserData] = useState(UsersTabBodyData);

  const handleViewModal = (data: UserManagementTabType) => {
    setSelectedRowData(data);
    viewModalToggle();
  };

  const handleToggle = (id: number) => {
    setUserData((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
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
      <button
        className="edge-btn btn-tertiary tb-action-button"
        id={`btn-3`}
        // onClick={() => handleViewModal(data)}
      >
        <i className="icon-trash" /> Delete
      </button>
      <button
        className={`edge-btn ${
          data.isActive ? "btn-danger" : "btn-secondary"
        } tb-action-button`}
        onClick={() => handleToggle(data.id)}
      >
        <i className="icon-alert" /> {data.isActive ? "Deactivate" : "Activate"}
      </button>
    </div>
  );

  const userManagementColumn: TableColumn<UserManagementTabType>[] = [
    {
      name: "User ID",
      selector: (row) => `${row.userId}`,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => `${row.name}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => `${row.email}`,
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row) => `${row.mobNo}`,
      sortable: true,
    },
    {
      name: "Holdings Value",
      selector: (row) => `${row.holdingsValue.total?.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => <ActionDataSource data={row} />,
      sortable: true,
      width: "30%",
      // center: true,
    },
  ];

  const filteredItems = userData.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
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
    <>
      <ViewModal
        viewModalOpen={viewModalOpen}
        viewModalToggle={viewModalToggle}
        rowData={selectedRowData}
      />
      <div className="table-responsive">
        <DataTable
          columns={userManagementColumn}
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

export default UsersTab;
