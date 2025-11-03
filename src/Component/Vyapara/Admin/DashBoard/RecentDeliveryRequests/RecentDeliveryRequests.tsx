import React, { useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Col, Input, Label } from "reactstrap";
import {
  RecenetDeliveryRequestsHeading,
  SearchTableButton,
} from "../../../../../utils/Constant";
import { H4 } from "../../../../../AbstractElements";
import DataTable, { TableColumn } from "react-data-table-component";
import { RecentDeliveryRequestsTableColumnsType } from "../../../../../Type/Vyapara/Admin/DashBoard/RecentDeliveryRequests";

interface ActionDataSourceProp {
  data: RecentDeliveryRequestsTableColumnsType;
}

function RecentDeliveryRequests() {
  const RecentDeliveryRequestsTableBodyData = [
    {
      id: 1,
      orderId: "#IH63390",
      user: "Elle Amberson",
      item: "5g Gold Coin",
      status: "Pending Assignment",
      color: "warning",
      action: "t-1",
    },
    {
      id: 2,
      orderId: "#F749U8",
      user: "Anna Catmire",
      item: "10g Silver Bar",
      status: "In Transit",
      color: "tertiary",
      action: "t-2",
    },
    {
      id: 3,
      orderId: "#RT5094",
      user: "Laura Dagson",
      item: "5g Gold Coin",
      status: "Pending Assignment",
      color: "warning",
      action: "t-3",
    },
    {
      id: 4,
      orderId: "#PZ7384",
      user: "Rachel Green",
      item: "10g Silver Bar",
      status: "In Transit",
      color: "tertiary",
      action: "t-4",
    },
  ];

  const ActionDataSource: React.FC<ActionDataSourceProp> = ({ data }) => (
    <div className="action simple-list tb-action-flex" key={data.id}>
      {data?.status === "In Transit" && (
        <button
          className="edge-btn btn-primary tb-action-button"
          id={`btn-3`}
          // onClick={() => handleEditModal(data)}
        >
          <i className="icon-location-pin" /> Track
        </button>
      )}
      {data?.status === "Pending Assignment" && (
        <button
          className="edge-btn btn-secondary tb-action-button"
          id={`btn-3`}
          // onClick={() => handleDeleteModal(data.id)}
        >
          <i className="icon-plus" /> Assign
        </button>
      )}
    </div>
  );

  const recentDeliveryRequestsColumn: TableColumn<RecentDeliveryRequestsTableColumnsType>[] =
    [
      {
        name: "Order ID",
        selector: (row) => `${row.orderId}`,
        sortable: true,
      },
      {
        name: "User",
        selector: (row) => `${row.user}`,
        sortable: true,
      },
      {
        name: "Item",
        selector: (row) => `${row.item}`,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => `${row.status}`,
        sortable: true,
      },
      {
        name: "Action",
        cell: (row) => <ActionDataSource data={row} />,
        sortable: true,
        width: "25%",
        // center: true,
      },
    ];

  const [filterText, setFilterText] = useState("");

  const filteredItems = RecentDeliveryRequestsTableBodyData.filter(
    (item) =>
      item.user && item.user.toLowerCase().includes(filterText.toLowerCase())
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
    <Col sm="12">
      <Card>
        <CardHeader className="pb-0 card-no-border">
          <H4>{RecenetDeliveryRequestsHeading}</H4>
        </CardHeader>
        <CardBody>
          <DataTable
            columns={recentDeliveryRequestsColumn}
            data={filteredItems}
            pagination
            // subHeader
            subHeaderComponent={subHeaderComponentMemo}
            highlightOnHover
            striped
            responsive
          />
        </CardBody>
      </Card>
    </Col>
  );
}

export default RecentDeliveryRequests;
