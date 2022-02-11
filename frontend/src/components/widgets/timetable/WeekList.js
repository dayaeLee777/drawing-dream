import { registerTimeTable } from "api/timetable";
import commonCode from "config/commonCode";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DayList from "./DayList";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
  font-weight: bold;
`;

const Period = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
  font-size: 20px;
  text-align: center;
  line-height: 30px;
  div {
    height: 30px;
  }

  &.Today {
    article {
      color: #fec25c;
    }
    div {
      background-color: #fec25c;
    }
  }
`;

export const Day = styled.article`
  font-size: 20px;
  height: 30px;
`;

export const Class = styled.section`
  height: 30px;
  font-size: 15px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1.3rem;

  div {
    border: 1px solid #f2f2f2;
    box-shadow: 0px 4px 4px 2px rgb(0 0 0 / 10%);
    border-radius: 2px 22px;
    background-color: #f2f2f2;
  }

  section {
    border: 1px solid white;
    box-shadow: 0px 4px 4px 2px white;
    border-radius: 2px 22px;
    background-color: white;
  }
`;

const WeekList = () => {
  /*
  const sampleData = [
    // 월요일
    {
      courseId: "6bc290c2-a265-5a4d-4802-c28678c285c3",
      dayCode: "H01",
      periodCode: "I01",
      semesterCode: "O01",
    },
    {
      courseId: "c2804bc3-9135-c2a4-c38a-4174c28909c3",
      dayCode: "H01",
      periodCode: "I02",
      semesterCode: "O01",
    },
    {
      courseId: "c3b26552-154c-724b-c2ad-c29c16c297c3",
      dayCode: "H01",
      periodCode: "I03",
      semesterCode: "O01",
    },
    {
      courseId: "c3b6c3ab-043a-7d7e-42c2-a3c28cc285c3",
      dayCode: "H01",
      periodCode: "I04",
      semesterCode: "O01",
    },
    {
      courseId: "c2964246-c2b5-07c3-934f-c39ac2b24f47",
      dayCode: "H01",
      periodCode: "I05",
      semesterCode: "O01",
    },
    {
      courseId: "594364c3-b1c2-bec3-9a4d-6dc29dc3b5c2",
      dayCode: "H01",
      periodCode: "I06",
      semesterCode: "O01",
    },
    // 월요일
    {
      courseId: "6bc290c2-a265-5a4d-4802-c28678c285c3",
      dayCode: "H02",
      periodCode: "I01",
      semesterCode: "O01",
    },
    {
      courseId: "c2804bc3-9135-c2a4-c38a-4174c28909c3",
      dayCode: "H02",
      periodCode: "I02",
      semesterCode: "O01",
    },
    {
      courseId: "c3b26552-154c-724b-c2ad-c29c16c297c3",
      dayCode: "H02",
      periodCode: "I03",
      semesterCode: "O01",
    },
    {
      courseId: "c3b6c3ab-043a-7d7e-42c2-a3c28cc285c3",
      dayCode: "H02",
      periodCode: "I04",
      semesterCode: "O01",
    },
    {
      courseId: "c2964246-c2b5-07c3-934f-c39ac2b24f47",
      dayCode: "H02",
      periodCode: "I05",
      semesterCode: "O01",
    },
    {
      courseId: "594364c3-b1c2-bec3-9a4d-6dc29dc3b5c2",
      dayCode: "H02",
      periodCode: "I06",
      semesterCode: "O01",
    },
    // 월요일
    {
      courseId: "6bc290c2-a265-5a4d-4802-c28678c285c3",
      dayCode: "H03",
      periodCode: "I01",
      semesterCode: "O01",
    },
    {
      courseId: "c2804bc3-9135-c2a4-c38a-4174c28909c3",
      dayCode: "H03",
      periodCode: "I02",
      semesterCode: "O01",
    },
    {
      courseId: "c3b26552-154c-724b-c2ad-c29c16c297c3",
      dayCode: "H03",
      periodCode: "I03",
      semesterCode: "O01",
    },
    {
      courseId: "c3b6c3ab-043a-7d7e-42c2-a3c28cc285c3",
      dayCode: "H03",
      periodCode: "I04",
      semesterCode: "O01",
    },
    {
      courseId: "c2964246-c2b5-07c3-934f-c39ac2b24f47",
      dayCode: "H03",
      periodCode: "I05",
      semesterCode: "O01",
    },
    {
      courseId: "594364c3-b1c2-bec3-9a4d-6dc29dc3b5c2",
      dayCode: "H03",
      periodCode: "I06",
      semesterCode: "O01",
    },
    // 월요일
    {
      courseId: "6bc290c2-a265-5a4d-4802-c28678c285c3",
      dayCode: "H04",
      periodCode: "I01",
      semesterCode: "O01",
    },
    {
      courseId: "c2804bc3-9135-c2a4-c38a-4174c28909c3",
      dayCode: "H04",
      periodCode: "I02",
      semesterCode: "O01",
    },
    {
      courseId: "c3b26552-154c-724b-c2ad-c29c16c297c3",
      dayCode: "H04",
      periodCode: "I03",
      semesterCode: "O01",
    },
    {
      courseId: "c3b6c3ab-043a-7d7e-42c2-a3c28cc285c3",
      dayCode: "H04",
      periodCode: "I04",
      semesterCode: "O01",
    },
    {
      courseId: "c2964246-c2b5-07c3-934f-c39ac2b24f47",
      dayCode: "H04",
      periodCode: "I05",
      semesterCode: "O01",
    },
    {
      courseId: "594364c3-b1c2-bec3-9a4d-6dc29dc3b5c2",
      dayCode: "H04",
      periodCode: "I06",
      semesterCode: "O01",
    },
    // 월요일
    {
      courseId: "6bc290c2-a265-5a4d-4802-c28678c285c3",
      dayCode: "H05",
      periodCode: "I01",
      semesterCode: "O01",
    },
    {
      courseId: "c2804bc3-9135-c2a4-c38a-4174c28909c3",
      dayCode: "H05",
      periodCode: "I02",
      semesterCode: "O01",
    },
    {
      courseId: "c3b26552-154c-724b-c2ad-c29c16c297c3",
      dayCode: "H05",
      periodCode: "I03",
      semesterCode: "O01",
    },
    {
      courseId: "c3b6c3ab-043a-7d7e-42c2-a3c28cc285c3",
      dayCode: "H05",
      periodCode: "I04",
      semesterCode: "O01",
    },
    {
      courseId: "c2964246-c2b5-07c3-934f-c39ac2b24f47",
      dayCode: "H05",
      periodCode: "I05",
      semesterCode: "O01",
    },
    {
      courseId: "594364c3-b1c2-bec3-9a4d-6dc29dc3b5c2",
      dayCode: "H05",
      periodCode: "I06",
      semesterCode: "O01",
    },
  ];

  // sampleData 등록
  for (let data of sampleData) {
    registerTimeTable(data);
  } */

  const { data, todayData } = useSelector((state) => state.timetable);
  // console.log(data);
  // console.log(data.filter((period) => period.dayCode === "H01"));
  return (
    <Container>
      <Period>
        <Day />
        <Class>
          {Object.entries(commonCode.I).map(
            ([key, value]) =>
              key !== "I00" && <section key={key}>{value}</section>
          )}
        </Class>
      </Period>
      {Object.entries(commonCode.H).map(([key, value]) => (
        <Period key={key} className={key === "H02" ? "Today" : ""}>
          <Day>{value.substring(0, 1)}</Day>
          <DayList data={data.filter((period) => period.dayCode === key)} />
        </Period>
      ))}
    </Container>
  );
};

export default WeekList;
