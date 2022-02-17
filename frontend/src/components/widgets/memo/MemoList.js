import { getMemoList } from "api/memo";
import { errorAlert } from "modules/alert";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MemoItem from "./MemoItem";

const Container = styled.div`
  margin-top: 0.5rem;
  box-sizing: border-box;
  width: 90%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 10px;
    display: ${(props) => (props.main ? "none" : "")};
  }
  ::-webkit-scrollbar-thumb {
    background-color: #adb5bd;
    border-radius: 10px;
  }
`;

const RegisterBtn = styled.div`
  color: ${({ theme }) => theme.memoColor};
  margin-top: 3rem;
  cursor: pointer;
`;
const NullList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MemoList = ({
  setStatus,
  isListLoading,
  setIsListLoading,
  setMemoId,
  main,
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isListLoading) {
      getMemoList()
        .then((res) => {
          setData(res.data);
          setIsListLoading(false);
        })
        .catch((e) => {
          errorAlert(e.response.status, "메모를 불러오지 못했습니다");
        });
    }
  }, [isListLoading]);

  const onChangeStatus = () => {
    setStatus("register");
  };

  return (
    <>
      <Container main={main}>
        {!isListLoading &&
          data &&
          data.map((item) => (
            <MemoItem
              main={main}
              setStatus={setStatus}
              key={item.memoId}
              setMemoId={setMemoId}
              data={item}
            />
          ))}
        {!isListLoading && data.length === 0 && (
          <NullList>등록된 메모가 없습니다.</NullList>
        )}
      </Container>
      {!main && (
        <RegisterBtn onClick={onChangeStatus}>새 메모 등록하기</RegisterBtn>
      )}
    </>
  );
};

export default MemoList;
