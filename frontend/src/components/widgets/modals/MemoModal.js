import React, { useEffect, useState } from "react";
import { getMemoList } from "api/memo";
import { motion } from "framer-motion";
import styled from "styled-components";
import MemoList from "../memo/MemoList";
import MemoInsert from "../memo/MemoInsert";


const Wrapper = styled(motion.div)`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: white;
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: fit-content;
  margin: 2rem;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: black;
  display: flex;
  align-items: end;
  margin-bottom: 20px;
`;

const MemoModal = ({ layoutId }) => {
  const [memos, setMemos] = useState([]);
  const [showInsert, setShowInsert] = useState(false);

  useEffect(() => {
    getMemoList().then((response) => {
      setMemos(response.data);
      console.log(response);
    });
  }, []);

  const onClick = (event) => {
    event.stopPropagation();
  };
  console.log("showInsert")
  console.log(showInsert)

  return (
    <Wrapper onClick={onClick} layoutId={layoutId}>
      <Header>
        <Title>메모</Title>
      </Header>

      {showInsert ?
        <MemoInsert
          setShowInsert={setShowInsert}
        /> :
      <div>
      <MemoList
        setShowInsert={setShowInsert}
       mod = {true}
      />
      </div>
      }
    </Wrapper>
  );
};

export default MemoModal;
