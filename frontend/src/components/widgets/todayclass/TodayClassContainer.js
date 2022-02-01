import React from "react";
import styled from "styled-components";
import CourseName from "./CourseName";
import TodayClassList from "./TodayClassList";

const Container = styled.div`
  margin-bottom: 3rem;
  .title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
`;

const TodayClassContainer = (props) => {
  const data = props.data;
  return (
    <Container>
      <div className="title">오늘의 수업</div>
      <TodayClassList data={data} />
    </Container>
  );
};

export default TodayClassContainer;
