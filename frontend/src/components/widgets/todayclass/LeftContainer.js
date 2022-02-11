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
        <TodayClassContainer data={props.data} />
      )}
      <CourseInfo data={props.data} />
    </Container>
  );
};

export default LeftContainer;
