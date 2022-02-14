import commonCode from "config/commonCode";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 4rem;
  height: 4rem;
  border: none;
  /* background-color: ${(props) => (props.now ? "#ffffff" : "#ffffff")}; */
  background-color: ${({ theme }) => theme.classColor};

  border-radius: 20px;
  box-shadow: ${(props) =>
    props.now
      ? "0px 0px 4px 4px rgba(231, 56, 113, 1)"
      : "0px 0px 4px 4px rgba(0, 0, 0, 0.1)"};
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  .name {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const CourseName = ({ data, now }) => {
  const common = data.courseCode.substr(0, 1);
  const middle = data.courseCode.substr(0, 3);
  const end = data.courseCode;
  return (
    <Container now={now}>
      <div className="name">{commonCode[common][middle][end]}</div>
    </Container>
  );
};

export default CourseName;
