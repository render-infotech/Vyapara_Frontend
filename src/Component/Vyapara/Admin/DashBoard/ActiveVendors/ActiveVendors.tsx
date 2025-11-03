import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import VyCommonHeader from "../VyCommonHeader";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

function ActiveVendors() {
  const primary = "#43B9B2";
  const activeVendorsChartData: ApexOptions = {
    series: [
      {
        name: "Active Vendors",
        data: [15, 18, 20, 22, 25, 30, 28, 26, 32, 35, 33, 40], // sample data
      },
    ],
    chart: {
      height: 150,
      type: "line", // use 'line' for a clean activity trend
      zoom: { enabled: false },
      toolbar: { show: false },
      sparkline: { enabled: false },
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    markers: {
      size: 4,
      colors: [primary],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    colors: [primary],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
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
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      labels: { show: false },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `${val} vendors`,
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
        <VyCommonHeader title="Active Vendors" number="15" />
        <CardBody className="px-0">
          <ReactApexChart
            className="revenuechart"
            options={activeVendorsChartData}
            series={activeVendorsChartData.series}
            height={150}
            type="area"
          />
        </CardBody>
      </Card>
    </Col>
  );
}

export default ActiveVendors;
