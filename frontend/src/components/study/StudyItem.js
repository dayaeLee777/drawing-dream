import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  width: 160px;
  height: 160px;
  box-shadow: ${({ theme }) => theme.borderShadow};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.widgetColor};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  svg {
    color: #fec25c;
  }
`;

const Name = styled.div`
  margin-bottom: 1rem;
  text-align: right;
  display: flex;
  justify-content: center;
`;


const StudyItem = () => {
  return (
    <>
      <Container
        whileHover={{
          scale: 1.1,
        }}
      >
        <Wrapper>
          <Name>test</Name>
        </Wrapper>
      </Container>
    </>
  );
};

export default StudyItem;
