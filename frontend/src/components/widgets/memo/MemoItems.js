import { getMemo, getMemoList } from "api/memo";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MemoDetail from "./MemoDetail";
import MemoItem from "./MemoItem";

const Container = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const MemoItems = () => {
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

  if (memos.length===0) {
    return (
        <Container>
            <div>
            메모를 등록해주세요.
            </div>
        </Container>
    );
  };

  return (
    <Container>
    {loading ? (
    <div>loading...</div>
    ) : (
        <>
            {memos.slice(0, 3).map((data) => (
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
    </Container>
  );
};

export default MemoItems;
