import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StudyList from "components/layout/study/StudyList";

const Container = styled.div`
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  background-color: ${({ theme }) => theme.ContainerColor};
  height: 80vh;
`;

const Title = styled.div`
  font-size: 1.8rem;
  margin: 3rem 0;
  font-weight: 600;
`;

const InnerContainer = styled.div`
  width: 100%;
  margin-bottom: 3rem;
`;

const Study = () => {
  return (
    <Container>
      <Title>스터디</Title>
      <InnerContainer>
        <StudyList />
      </InnerContainer>
    </Container>
  );
};

export default Study;
