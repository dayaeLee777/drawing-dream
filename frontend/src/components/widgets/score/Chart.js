import ApexCharts from "react-apexcharts";
import commonCode from "config/commonCode";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  height: 90%;
`;

const Chart = () => {
  return (
    <Container>
      <ApexCharts
        type="bar"
        series={[
          {
            name: "평균",
            data: [100, 89, 93, 76, 80, 78],
          },
        ]}
        options={{
          chart: {
            height: "100%",
            width: "100%",
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          xaxis: {
            categories: [
              [commonCode.E.E01, commonCode.J.J10.J1001],
              ["1학년 1학기", "기말고사"],
              ["1학년 2학기", "중간고사"],
              ["1학년 2학기", "기말고사"],
              ["2학년 1학기", "중간고사"],
              ["2학년 2학기", "기말고사"],
            ],
          },
          labels: {
            style: {
              colors: "#fec25c",
              fontSize: "12px",
            },
          },
          yaxis: {
            min: 0,
            max: 100,
          },
          // tooltip: {
          //   y: {
          //     formatter: (value) => `$${value.toFixed(2)}`,
          //   },
          // },
        }}
      />
    </Container>
  );
};

export default Chart;
