import { getMemo, deleteMemo } from "api/memo";
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

const Remove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
`;

const SubContainer = styled.div`
width: 100%;
`;

const Title = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;
const Time = styled.div`
width: 100%;
`;

const MemoItem = ({ data, memoId, setLoading, setMemoId }) => {
  // const [showDetail, setShowDetail] = useState(false);
  const getDetail = () => {
    // setShowDetail(true); 
    setMemoId(memoId);
  };
  const onRemove = () => {
    deleteMemo(memoId).then(setLoading(true));
  };
  return (
    <Container>
      <SubContainer onClick={getDetail}>
        <Title>{data.content}</Title>
        <Time>{data.regTime}</Time>
      </SubContainer>
      <div>
        <Remove onClick={onRemove}>
        ❌
        </Remove>
      </div>
    </Container>
  );
};

export default MemoItem;
