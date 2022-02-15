import styled from "styled-components";
import { motion } from "framer-motion";
import WeekList from "./timetable/WeekList";

const Container = styled(motion.div)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: ${({ theme }) => theme.ContainerColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  width: 85%;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  width: fit-content;
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
`;

const TimeTable = ({
  isShow,
  setIsShow,
  isntShow,
  setIsntShow,
  widgetId,
  setWidgetId,
}) => {
  const close = () => {
    const newIsShow = isShow.filter((wid) => {
      return wid !== widgetId;
    });
    setIsShow(newIsShow);
    setIsntShow([...isntShow, widgetId]);
  };
  return (
    <Container
      layout
      layoutId="M07"
      whileHover={{
        scale: 1.01,
      }}
      onClick={() => {
        if (setWidgetId) setWidgetId("M07");
      }}
    >
      <Wrapper>
        <Title>시간표</Title>
        {setIsShow && <CloseButton onClick={close}>❌</CloseButton>}
      </Wrapper>
      <WeekList widget />
    </Container>
  );
};

export default TimeTable;
