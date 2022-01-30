import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import CheckListContent from "../checkList/CheckListContent";

const Wrapper = styled(motion.div)`
  width: 600px;
  height: 600px;

  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: -1px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: fit-content;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: black;
  display: flex;
  align-items: end;
  margin-bottom: 20px;
`;

const CheckListModal = ({ layoutId, isLoad, setIsLoad }) => {
  const onClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Wrapper onClick={onClick} layoutId={layoutId}>
      <Header>
        <Title>체크 리스트</Title>
      </Header>
      <CheckListContent isLoad={isLoad} setIsLoad={setIsLoad} />
    </Wrapper>
  );
};

export default CheckListModal;
