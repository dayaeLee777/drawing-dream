import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  height: 30rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: ${({ theme }) => theme.widgetColor};
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

const CheckList = ({ setWidgetId, setIsShow }) => {
  const close = () => {
    setIsShow(false);
  };
  return (
    <Container
      layout
      layoutId="M03"
      whileHover={{
        scale: 1.01,
      }}
      onClick={() => {
        setWidgetId("M03");
      }}
    >
      <Wrapper>
        <Title>체크 리스트</Title>
        <CloseButton onClick={close}>❌</CloseButton>
      </Wrapper>
    </Container>
  );
};

export default CheckList;
