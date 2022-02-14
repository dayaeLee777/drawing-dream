import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TodayClassWidget from "./TodayClassWidget";
import CourseInfoDetail from "./CourseInfoDetail";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  .title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
`;

const LeftContainer = (props) => {
  const { userCode } = useSelector((state) => state.user);
  return (
    <Container>
      {userCode === "A04" && (
        <>
          <div className="title">오늘의 수업</div>
          <TodayClassWidget data={props.todayData} files={props.files} />
        </>
      )}
      <div className="title">수업 정보</div>
      <CourseInfoDetail
        files={props.files}
        setFiles={props.setFiles}
        periodCode={props.period}
        courseInfo={props.courseInfo}
        courseId={props.courseId}
      />
    </Container>
  );
};

export default LeftContainer;
