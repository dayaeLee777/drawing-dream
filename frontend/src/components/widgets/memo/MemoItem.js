import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 5rem;
  border: 1px solid #828282;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 5px;
  /* background-color: ${({ theme }) => theme.widgetColor}; */
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .regTime {
    margin-top: 1rem;
    font-size: 0.8rem;
    color: #777777;
  }
`;

const MemoItem = ({ data, setMemoId, setStatus, main }) => {
  const onDetail = () => {
    setMemoId(data.memoId);
    setStatus("modify");
  };

  return (
    <Container onClick={main? null:onDetail}>
      <div className="content">{data.content}</div>
      <div className="regTime">{data.regTime}</div>
    </Container>
  );
};

export default MemoItem;
