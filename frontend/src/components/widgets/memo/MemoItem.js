import styled from "styled-components";
import MemoRemove from "./MemoRemove";

const Container = styled.div`
  width: 70%;
  height: 20%;
  border: 1px solid #828282;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  /* background-color: ${({ theme }) => theme.widgetColor}; */
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

const MemoItem = ({ data, memoId, setLoading, setMemoId, mod }) => {
  const getDetail = () => {
    setMemoId(memoId);
  };
  return (
    <Container>
      <SubContainer onClick={getDetail}>
        <Title>{data.content}</Title>
        <Time>{data.regTime}</Time>
      </SubContainer>
      {mod ?
      <div>
        <MemoRemove 
        memoId={memoId}
        setLoading={setLoading}
        />
      </div>
      : <div></div>
      }
    </Container>
  );
};

export default MemoItem;
