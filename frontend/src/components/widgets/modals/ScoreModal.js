import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Chart from "../score/Chart";
const Wrapper = styled(motion.div)`
  width: 800px;
  height: 800px;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.widgetColor};
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: ${({ theme }) => theme.textColor};
  margin-top: 2rem;
  display: flex;
  align-items: end;
  margin-bottom: 20px;
`;

const ScoreModal = ({ layoutId }) => {
  const onClick = (event) => {
    event.stopPropagation();
  };
  return (
    <Wrapper onClick={onClick} layoutId={layoutId}>
      <Header>
        <Title>성적 추이</Title>
      </Header>
      <Chart />
    </Wrapper>
  );
};

export default ScoreModal;
