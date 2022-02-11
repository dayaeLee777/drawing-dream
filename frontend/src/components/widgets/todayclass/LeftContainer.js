import React from "react";
import styled from "styled-components";
import CourseInfo from "./CourseInfo";
import TodayClassContainer from "./TodayClassContainer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const LeftContainer = (props) => {
  return (
    <Container>
      <TodayClassContainer data={props.data} />
      <CourseInfo data={props.data} />
    </Container>
  );
};

export default LeftContainer;
