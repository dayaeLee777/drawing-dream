import React from "react";
import styled from "styled-components";
import CourseInfo from "./CourseInfo";
import TodayClass from "./TodayClass";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const LeftContainer = (props) => {
  console.log(props.data);
  return (
    <Container>
      <TodayClass data={props.data} />
      <CourseInfo data={props.data} />
    </Container>
  );
};

export default LeftContainer;
