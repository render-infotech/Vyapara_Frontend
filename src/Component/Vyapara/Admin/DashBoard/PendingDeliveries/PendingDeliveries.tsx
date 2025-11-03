import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import VyCommonHeader from "../VyCommonHeader";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

function PendingDeliveries() {
  const warning = "#ffc107";
  const pendingDeliveriesChartData: ApexOptions = {
    series: [
      {
        name: "Pending Deliveries",
        data: [10, 14, 9, 18, 25, 22, 30, 26, 20, 15, 10, 8], // sample data per month
      },
    ],
    chart: {
      height: 150,
      type: "area",
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: [warning],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { show: false },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `${val} pending`,
      },
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: { height: 136 },
        },
      },
    ],
  };
  return (
    <Col sm="6" md="3">
      <Card className="total-project">
        <VyCommonHeader title="Pending Deliveries" number="85" />
        <CardBody className="px-0">
          <ReactApexChart
            className="revenuechart"
            options={pendingDeliveriesChartData}
            series={pendingDeliveriesChartData.series}
            height={150}
            type="area"
          />
        </CardBody>
      </Card>
    </Col>
  );
}

export default PendingDeliveries;
