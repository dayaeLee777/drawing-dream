import { getMemo, getMemoList } from "api/memo";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MemoDetail from "./MemoDetail";
import MemoItem from "./MemoItem";
import MemoInsert from "./MemoInsert";

const Container = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #adb5bd;
    border-radius: 10px;
  }
`;

const MemoList = () => {
  const [memos, setMemos] = useState([]);
  const [memoId, setMemoId] = useState();
  const [content, setContent] = useState();
  const [regTime, setRegTime] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMemoList().then((response) => {
      setMemos(response.data);
      setLoading(false);
      console.log(response);
    });
  }, []);

  useEffect(() => {
    if (memoId) {
      setLoading(true);
      getMemo(memoId).then((res) => {
        const {
          data: { content, regTime },
        } = res;
        setContent(content);
        setRegTime(regTime);
        setLoading(false);
      });
    }
  }, [memoId]);

  useEffect(() => {
    if(loading){
  getMemoList().then((response) => {
    setMemos(response.data);
    setLoading(false);
    console.log(response);
  });
  }
}, [loading]);

  return (
    <Container>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          {memoId ? (
            <MemoDetail
            content={content}
            regTime={regTime} 
            setMemoId={setMemoId}
            />
          ) : (
            <>
            <MemoInsert setLoading={setLoading} />
              {memos.slice(0, memos.length).map((data) => (
                <MemoItem
                  setMemoId={setMemoId}
                  memoId={data.memoId}
                  setLoading={setLoading}
                  key={data.memoId}
                  data={data}
                />
              ))}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default MemoList;
