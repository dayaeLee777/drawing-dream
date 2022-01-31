import React, { useState } from "react";
import styled from "styled-components";
import CourseInfoDetail from "./CourseInfoDetail";

const Container = styled.div`
  .title {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }
`;

const CourseInfo = (props) => {
  const [nowCourse, setNowCourse] = useState(0);
  return (
    <Container>
      <div className="title">수업 정보</div>
      <CourseInfoDetail data={props.data[nowCourse]} />
    </Container>
  );
};

export default CourseInfo;
