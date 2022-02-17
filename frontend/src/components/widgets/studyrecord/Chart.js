import ApexCharts from "react-apexcharts";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 80%;
  height: 100%;
`;

const Chart = ({ records }) => {
  // const [isListLoading, setIsListLoading] = useState(true);
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
    let newTimes = times.concat();
    let flag = 0
    records.map((record) => {
      if (record.endTime !== null) {
        let startTime = parseInt(record.startTime.slice(11, 13));
        let startMin = parseInt(record.startTime.slice(14, 16));
        let hour = parseInt(record.durationTime.slice(0, 2));
        let min = parseInt(record.durationTime.slice(3, 5));
        let totalMin = hour * 60 + min;

        for (let i in newTimes) {
          if (parseInt(newTimes[i].x) === startTime) {
            if (totalMin + startMin > 60) {
              newTimes[startTime - 9] = {
                x: String(startTime),
                y: newTimes[i].y + (60 - startMin),
              };
              totalMin -= 60 - startMin;
              flag = 1;
            } else {
              newTimes[parseInt(startTime) - 9] = {
                x: String(startTime),
                y: totalMin + newTimes[i].y,
              };
            }
          }
          
          if (parseInt((totalMin + (60 - startMin)) / 60) && flag) {
            startTime++;
            startMin = 0;
            flag = 0
          }
        }
        setTimes(newTimes);
      }
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
          yaxis: {
            max: 60,
          },
          fill: {
            colors: "#fec25c",
          },
        }}
      />
    </Container>
  );
};

export default Chart;
