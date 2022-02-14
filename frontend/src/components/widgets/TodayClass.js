import styled from "styled-components";
import { motion } from "framer-motion";
import TodayClassList from "./todayclass/TodayClassList";
import { useSelector } from "react-redux";

const Container = styled(motion.div)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: ${({ theme }) => theme.ContainerColor};
  max-height: 20rem;
  border-radius: 10px;
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

const ListContainer = styled.div`
  margin-top: 2rem;
`;

const TodayClass = ({
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
  const { todayData } = useSelector((state) => state.timetable);
  /////////////testdata//////////////
  // const data = [
  //   {
  //     dayCode: "H01",
  //     periodCode: "I01",
  //     subjectCode: "G0100",
  //   },
  //   {
  //     dayCode: "H01",
  //     periodCode: "I02",
  //     subjectCode: "G0200",
  //   },
  //   {
  //     dayCode: "H01",
  //     periodCode: "I03",
  //     subjectCode: "G0300",
  //   },
  //   {
  //     dayCode: "H01",
  //     periodCode: "I04",
  //     subjectCode: "G0400",
  //   },
  //   {
  //     dayCode: "H01",
  //     periodCode: "I05",
  //     subjectCode: "G0500",
  //   },
  //   {
  //     dayCode: "H01",
  //     periodCode: "I06",
  //     subjectCode: "G0600",
  //   },
  //   {
  //     dayCode: "H01",
  //     periodCode: "I07",
  //     subjectCode: "G0700",
  //   },
  // ];
  return (
    <Container
      layout
      layoutId="M01"
      whileHover={{
        scale: 1.01,
      }}
      onClick={() => {
        if (setWidgetId) setWidgetId("M01");
      }}
    >
      <Wrapper>
        <Title>오늘의 수업</Title>
        {setIsShow && <CloseButton onClick={close}>❌</CloseButton>}
      </Wrapper>
      <ListContainer>
        <TodayClassList data={todayData} />
      </ListContainer>
    </Container>
  );
};

export default TodayClass;
