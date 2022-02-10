import ApexCharts from "react-apexcharts";
import commonCode from "config/commonCode";
import styled from "styled-components";
import { getScore } from "api/score";
import { useEffect } from "react";
import { useState } from "react";

const Container = styled.div`
  width: 95%;
  height: 90%;

  & > div > div > svg{
    height: 500px;
  }
`;

const Chart = () => {
  const [avg, setAvg] = useState([]);
  const [record, setRecord] = useState(new Array(24).fill(0));
  const [subCnt, setSubCnt] = useState(new Array(24).fill(0)); // 1~6학년, 1, 2학기 중간, 기말
  const label = []

  useEffect(() => {
    getScore().then((res) => {
      const score = res.data.scoreGetResponseDtoList;
      let idx = 0;
      let score_temp = record.concat();
      let subject_temp = subCnt.concat();
      for(idx; idx < score.length; idx++) {
        const _grade = Number((score[idx].gradeCode.substring(2,3) - 1))
        const _semester = Number((score[idx].semesterCode.substring(2,3) - 1))
        const _class = Number((score[idx].testCode.substring(4,5) - 1))
        score_temp[_grade * 4 + _semester * 2 + _class]=(score_temp[_grade * 4 + _semester * 2 + _class] + score[idx].score)
        subject_temp[_grade * 4 + _semester * 2 + _class]=(subject_temp[_grade * 4 + _semester * 2 + _class] + 1)
        if (idx === score.length - 1){
          let avg_temp = avg.concat();
          for (let avg_idx = 0 ; avg_idx < record.length; avg_idx++){
            if(subject_temp[avg_idx] !== 0) {
              avg_temp.push(score_temp[avg_idx] / subject_temp[avg_idx])
            }
          }
          setAvg(avg_temp)
        }
      }
      setRecord(score_temp)
      setSubCnt(subject_temp)
    }
    );
  }, []);

  const labels = () => {

    const E = commonCode.E
    const O = commonCode.O
    const J = commonCode.J.J10
    

    for(let idx = 0 ; idx < avg.length ; idx++){
      if (parseInt (idx / 4) === 0){
      label.push([[E.E01]])
      }
      else if (parseInt (idx / 4) === 1){
        label.push([E.E02])
      }
      else if (parseInt (idx / 4) === 2){
        label.push([E.E03])
      }
      else if (parseInt (idx / 4) === 3){
        label.push([E.E04])
      }
      else if (parseInt (idx / 4) === 4){
        label.push([E.E05])
      }
      else if (parseInt (idx / 4) === 5){
        label.push([E.E06])
      }

      if (idx % 4 === 0 || idx % 4 === 1){
        label[idx][0] = label[idx][0] + O.O01
      }
      else if (idx % 4 === 2 || idx % 4 === 3){
        label[idx][0] = label[idx][0] + O.O02
      }

      if (idx % 2 === 0){
        label[idx][0] = label[idx][0] + J.J1001
      }
      else if (idx % 2 === 1){
        label[idx][0] = label[idx][0] + J.J1002
      }
  }
}

  return (
    <Container onChange={labels()}>
      <ApexCharts
        type="bar"
        series={[
          {
            name: "평균",
            data: avg,
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
            categories: label,
            offsetX: 10,
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
        }}
      />
    </Container>
  );
};

export default Chart;
