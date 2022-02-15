import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  height: 5rem;
  box-shadow: ${({ theme }) => theme.borderShadow};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 1rem;
  background-color: ${({ theme }) => theme.widgetColor};
  cursor: pointer;
`;

const Name = styled.div`
  font-weight: 600;
`;
const Widget = ({ name, id, setWidgetId }) => {
  return (
    <Container
      layout
      layoutId={id}
      whileHover={{
        scale: 1.02,
      }}
      onClick={() => {
        setWidgetId(id);
      }}
    >
      <Name>{name}</Name>
    </Container>
  );
};

export default Widget;
