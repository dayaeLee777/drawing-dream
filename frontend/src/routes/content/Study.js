import React from "react";
import styled from "styled-components";
import StudyList from "components/study/StudyList";

const Container = styled.div`
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  background-color: ${({ theme }) => theme.ContainerColor};
  min-height: 85vh;
`;

const Title = styled.div`
  font-size: 1.8rem;
  margin: 3rem 0;
  font-weight: 600;
`;

const Desc = styled.div`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.menuColor};
`;

const InnerContainer = styled.div`
  width: 100%;
  margin-bottom: 3rem;
`;

const Study = () => {
  return (
    <Container>
      <Title>놀이터</Title>
      <Desc>서비스를 준비 중입니다. 잠시만 기다려 주세요!</Desc>
      <InnerContainer>
        <StudyList />
      </InnerContainer>
    </Container>
  );
};

export default Study;
