import React from "react";
import VyCommonHeader from "../VyCommonHeader";
import { Card, CardBody, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

function TotalRevenue() {
  const primary = "#43B9B2";
  const totalRevenueChartData: ApexOptions = {
    series: [
      {
        name: "Desktops",
        data: [
          4, 3, 10, 9, 29, 19, 25, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 29, 28, 20,
        ],
      },
    ],
    chart: {
      height: 150,
      type: "area",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.5,
        stops: [0, 100, 100],
      },
    },
    annotations: {
      xaxis: [
        {
          x: 300,
          borderWidth: 2,
          fillColor: primary,
          strokeDashArray: 4,
        },
      ],
      points: [
        {
          x: 300,
          y: 13,
          marker: {
            size: 5,
            fillColor: primary, // Change the color to your desired color
            strokeColor: primary, // Change the color to your desired color
            // radius: 5,
          },
          label: {
            borderWidth: 2,
            borderColor: primary,
            text: "$8700.00",
            position: "bottom",
            offsetX: 0,
            offsetY: -40,
            style: {
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "Montserrat",
            },
          },
        },
      ],
    },

    colors: [primary],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        offsetX: 0,
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: [
        "Jan",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "oct",
        "nov",
        "dec",
      ],
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 136,
          },
        },
      },
    ],
  };
  return (
    <Col sm="6" md="3">
      <Card className="total-project">
        <VyCommonHeader title="Total Revenue" number="₹1.2 Cr" />
        <CardBody className="px-0">
          <ReactApexChart
            className="revenuechart"
            options={totalRevenueChartData}
            series={totalRevenueChartData.series}
            height={150}
            type="area"
          />
        </CardBody>
      </Card>
    </Col>
  );
}

export default TotalRevenue;
