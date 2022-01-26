import React from "react";
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
  return (
    <Container>
      <MemoItem />
      <MemoItem />
    </Container>
  );
};

export default MemoList;
