import Button from "components/commons/button";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  border: 1px solid #828282;
  border-radius: 10px;
  padding: 3rem;
  flex-direction: column;
  justify-content: space-between;
`;

const MemoDetail = ({ content, regTime, setMemoId }) => {
  const onBack = () => {
    setMemoId ("")
  };
  return (
    <Container>
      <Button onClick={onBack} name="←" />
      <div>{content}</div>
      <div>{regTime}</div>
    </Container>
  );
};

export default MemoDetail;
