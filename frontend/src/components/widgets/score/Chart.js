import ApexCharts from "react-apexcharts";
import commonCode from "config/commonCode";
import styled from "styled-components";
import { getScore } from "api/score";
import { useEffect } from "react";
import { useState } from "react";

const Container = styled.div`
  width: 80%;
  height: 90%;
`;

const Chart = () => {
  const [data, setData] = useState([]);
  const [avg, setAvg] = useState([]);
  const [record, setRecord] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  useEffect(() => {
    getScore().then((res) => {
      const score = res.data.scoreGetResponseDtoList;
      setData(score);
      let idx = 0;
      for(idx; idx < score.length; idx++) {
        console.log(score[idx].gradeCode)
        const _grade = (score[idx].gradeCode.substring(2,3) - 1)
        const _class = (score[idx].testCode.substring(4,5) - 1)
        console.log(record[_grade * 4 + _class])
        const temp = record.concat();
        console.log(temp)
        record[_grade * 4 + _class].push(record[_grade * 4 + _class] + score[idx].score)
      }
    }
    );
  }, []);

  const onClick = () => {
    console.log(data)
    console.log(record)
  };

  return (
    <Container>
      <div onClick={onClick}>가나다</div>
      <ApexCharts
        type="bar"
        series={[
          {
            name: "평균",
            data: [100, 89, 93, 76, 80, 78, 40, 56],
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
              [commonCode.E.E01, commonCode.J.J10.J1002],
              [commonCode.E.E01, commonCode.J.J10.J1003],
              [commonCode.E.E01, commonCode.J.J10.J1004],
              [commonCode.E.E02, commonCode.J.J10.J1001],
              [commonCode.E.E02, commonCode.J.J10.J1002],
              [commonCode.E.E02, commonCode.J.J10.J1003],
              [commonCode.E.E02, commonCode.J.J10.J1004],
              // ["1학년 1학기", "중간고사"],
              // ["1학년 1학기", "기말고사"],
              // ["1학년 2학기", "중간고사"],
              // ["1학년 2학기", "기말고사"],
              // ["2학년 1학기", "중간고사"],
              // ["2학년 1학기", "기말고사"],
              // ["2학년 2학기", "중간고사"],
              // ["2학년 2학기", "기말고사"],
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
