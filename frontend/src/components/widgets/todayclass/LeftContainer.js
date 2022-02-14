import React from "react";
import styled from "styled-components";
import CourseInfo from "./CourseInfo";
import TodayClassContainer from "./TodayClassContainer";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const LeftContainer = (props) => {
  const { userCode } = useSelector((state) => state.user);
  return (
    <Container>
      {userCode === "A04" && (
        <TodayClassContainer data={props.data} files={props.files} />
      )}
      <CourseInfo
        files={props.files}
        setFiles={props.setFiles}
        period={props.period}
        courseInfo={props.courseInfo}
        setIsLoading={props.setIsLoading}
        courseId={props.courseId}
      />
    </Container>
  );
};

export default LeftContainer;
