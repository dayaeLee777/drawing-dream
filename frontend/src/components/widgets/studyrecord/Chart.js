import ApexCharts from "react-apexcharts";
import commonCode from "config/commonCode";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  height: 100%;
`;
const Chart = () => {
  return (
    <Container>
      <ApexCharts
        type="bar"
        series={[
          {
            data: [60, 50, 30, 0, 0, 30, 50, 60, 30, 20],
          },
        ]}
        options={{
          chart: {
            height: "500",
            // width: "100%",
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: false,
            colors: "#fec25c",
            fontSize: "12px",
          },
          xaxis: {
            categories: [
              // "6",
              // "7",
              // "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              // "23",
              // "24",
              // "1",
              // "2",
              // "3",
              // "4",
            ],
          },
        }}
      />
    </Container>
  );
};

export default Chart;
