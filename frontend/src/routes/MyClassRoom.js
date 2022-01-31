import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import commonCode from "config/commonCode";
import MemberList from "components/classroom/MemberList";

const Container = styled.div`
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  background-color: ${({ theme }) => theme.widgetColor};
`;

// const Desc = styled.div`
//   width: 90%;
// `;

const Title = styled.div`
  font-size: 1.8rem;
  margin: 3rem 0;
  font-weight: 600;
`;

const InnerContainer = styled.div`
  width: 100%;
  margin-bottom: 3rem;
`;

const Line = styled.div`
  margin: auto;
  width: 80%;
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, #ccc, #ccc);
`;

const MyClassRoom = () => {
  const { gradeCode, classCode } = useSelector((state) => state.user);
  useSelector((state) => state.user);
  return (
    <Container>
      <Title>우리 반 보기</Title>
      {/* <Desc>
        {commonCode.E[gradeCode]} {commonCode.F[classCode]}
      </Desc> */}
      <InnerContainer>
        <MemberList />
      </InnerContainer>
    </Container>
  );
};

export default MyClassRoom;
