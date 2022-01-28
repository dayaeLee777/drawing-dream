import { useEffect } from "react";
import styled from "styled-components";
import MemoItem from "./MemoItem";

const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MemoList = () => {
  useEffect(() => {}, []);
  return (
    <Container>
      <MemoItem />
      <MemoItem />
    </Container>
  );
};

export default MemoList;
