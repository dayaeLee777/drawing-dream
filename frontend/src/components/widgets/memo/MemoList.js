import { getMemo, getMemoList } from "api/memo";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MemoDetail from "./MemoDetail";
import MemoItem from "./MemoItem";
import Button from "components/commons/button";

const Container = styled.div`
  height: 23rem;
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

const Detail = styled.div`
  height: 200vh;
  width: 100%;
`;

const Register = styled.div`
  display: flex;
  margin-top: 3rem;
  align-items: center;
  justify-content: center;
`;

const MemoList = ({mod, setShowInsert}) => {
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

useEffect(() => {
getMemoList().then((response) => {
  setMemos(response.data);
  setLoading(false);
  console.log(response);
});
}, [mod]);


const onRegister = () => {
  console.log("Test")
  setShowInsert (true)
};

  return (
    <>
    <Container>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          {memoId ? (
            <Detail>
            <MemoDetail
            content={content}
            regTime={regTime} 
            setMemoId={setMemoId}
            />
            </Detail>
          ) : (
            <>
              {memos.slice(0, memos.length).map((data) => (
                  <MemoItem
                    setMemoId={setMemoId}
                    memoId={data.memoId}
                    setLoading={setLoading}
                    key={data.memoId}
                    data={data}
                    mod={mod}
                  />
                ))}
              </>
          )}
        </>
      )}
    </Container>
    
    {loading?<div/>:(memoId?<div/>: 
      <Register>
        {mod?
        <Button name="등록" onClick={onRegister}></Button>
        :<div/>}  
      </Register>
    )}
  </>
  );
};

export default MemoList;
