import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardBody, Col, Row } from "reactstrap";
import VyCommonHeader from "../VyCommonHeader";
import { ApexOptions } from "apexcharts";

function TotalUsers() {
  const primary = "#43B9B2";
  const secondary = "#c280d2";
  const totalProjectChartData: ApexOptions = {
    series: [65, 55, 40, 30],
    chart: {
      type: "donut",
      height: 260,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: {
              offsetY: -10,
            },
            value: {
              offsetY: -50,
            },
            total: {
              show: true,
              fontSize: "14px",
              fontFamily: "Outfit",
              fontWeight: 400,
              label: "Total",
              color: "#9B9B9B",
              formatter: (w) => "45.764",
            },
          },
        },
        customScale: 1,
        offsetX: 0,
      },
    },
    grid: {
      padding: {
        bottom: -120,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: [primary, secondary, "rgb(253, 126, 64)", "#F4F5F8"],
    responsive: [
      {
        breakpoint: 1870,
        options: {
          chart: {
            height: 250,
          },
        },
      },
      {
        breakpoint: 1780,
        options: {
          chart: {
            height: 240,
          },
        },
      },
      {
        breakpoint: 1740,
        options: {
          plotOptions: {
            pie: {
              expandOnClick: false,
              startAngle: -90,
              endAngle: 90,
              offsetY: 10,
              donut: {
                size: "70%",
                labels: {
                  show: true,
                  name: {
                    offsetY: -50,
                  },
                  value: {
                    offsetY: -30,
                  },
                },
              },
            },
          },
        },
      },
    ],
  };
  return (
    <Col md="3">
      <Card className="total-project">
        <VyCommonHeader title="Total Users" number="3051" />
        <CardBody>
          <Row>
            <Col xs="6" className="custom-width">
              <ReactApexChart
                className="customer-chart"
                options={totalProjectChartData}
                series={totalProjectChartData.series}
                type="donut"
                height={260}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
}

export default TotalUsers;
