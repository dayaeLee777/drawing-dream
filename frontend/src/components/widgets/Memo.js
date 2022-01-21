import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  height: 30rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
`;

const Memo = ({ setIsShow }) => {
  const close = () => {
    setIsShow("false");
    console.log("hi");
  };
  return (
    <Container
      layout
      layoutId={4}
      whileHover={{
        scale: 1.01,
      }}
    >
      <Wrapper>
        <Title>메모</Title>
        <CloseButton onClick={close}>❌</CloseButton>
      </Wrapper>
    </Container>
  );
};

export default Memo;
