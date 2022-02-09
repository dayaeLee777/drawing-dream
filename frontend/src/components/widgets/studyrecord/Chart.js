import ApexCharts from "react-apexcharts";
import commonCode from "config/commonCode";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 80%;
  height: 100%;
`;
const Chart = ({ records }) => {
  const [times, setTimes] = useState([
    { x: "9", y: 0 },
    { x: "10", y: 0 },
    { x: "11", y: 0 },
    { x: "12", y: 0 },
    { x: "13", y: 0 },
    { x: "14", y: 0 },
    { x: "15", y: 0 },
    { x: "16", y: 0 },
    { x: "17", y: 0 },
    { x: "18", y: 0 },
    { x: "19", y: 0 },
    { x: "20", y: 0 },
    { x: "21", y: 0 },
    { x: "22", y: 0 },
  ]);

  useEffect(() => {
    records.map((record) => {
      if (record.endTime === null) return;

      let startTime = record.startTime.slice(11, 13);
      let startMin = parseInt(record.startTime.slice(14, 16));
      let hour = record.durationTime.slice(0, 2);
      let min = record.durationTime.slice(3, 5);
      // console.log(hour, min);
      let totalMin = parseInt(hour) * 2 + parseInt(min);

      times.map((time) => {
        if (time.x === startTime) {
          if (totalMin + startMin + time.y > 60) {
            setTimes(
              times.map((time) =>
                time.x === startTime
                  ? { ...time, y: 60 - (time.y + startMin) }
                  : time
              )
            );
            totalMin -= 60 - (time.y + startMin);
          } else {
            setTimes(
              times.map((time) =>
                time.x === startTime
                  ? { ...time, y: parseInt(min) + time.y }
                  : time
              )
            );
            // console.log(times);
          }
        }
        // console.log(totalMin);
        if (totalMin >= 61) {
          startTime++;
          startMin = 0;
        }
      });
    });
  }, []);
  return (
    <Container>
      <ApexCharts
        type="bar"
        series={[
          {
            data: times,
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
