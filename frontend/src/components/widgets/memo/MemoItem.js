import { getMemo } from "api/memo";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 20%;
  border: 1px solid #828282;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 10px;
  /* background-color: ${({ theme }) => theme.widgetColor}; */
`;

const Title = styled.div`
  margin-bottom: 1rem;
`;
const Time = styled.div``;

const MemoItem = ({ data, memoId, setShowDetail, setMemoId }) => {
  // const [showDetail, setShowDetail] = useState(false);
  const getDetail = () => {
    // setShowDetail(true);
    setMemoId(memoId);
  };
  return (
    <Container onClick={getDetail}>
      <Title>{data.content}</Title>
      <Time>{data.regTime}</Time>
    </Container>
  );
};

export default MemoItem;
