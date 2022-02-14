import React, { useState } from "react";
import styled from "styled-components";
import CourseInfoDetail from "./CourseInfoDetail";

const Container = styled.div`
  .title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }
`;

const CourseInfo = (props) => {
  return (
    <Container>
      <div className="title">수업 정보</div>
      <CourseInfoDetail
        periodCode={props.period}
        courseInfo={props.courseInfo}
        files={props.files}
        setFiles={props.setFiles}
        courseId={props.courseId}
      />
    </Container>
  );
};

export default CourseInfo;
