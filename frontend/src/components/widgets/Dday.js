import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import commonCode from "config/commonCode";

const Container = styled(motion.div)`
  /* height: 15rem; */
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
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60%;
`;

const Content = styled.div`
  font-weight: 600;
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const Name = styled.div`
  font-size: 1.5rem;
`;

const Dday = ({
  isShow,
  setIsShow,
  isntShow,
  setIsntShow,
  widgetId,
  setWidgetId,
}) => {
  const [recentDday, setRecentDday] = useState("");
  const [DdayName, setDdayName] = useState("");
  const close = () => {
    const newIsShow = isShow.filter((wid) => {
      return wid !== widgetId;
    });
    setIsShow(newIsShow);
    setIsntShow([...isntShow, widgetId]);
  };

  const testData = [
    {
      id: "3bc288c2-b9c3-92c2-b9c3-8d47c2acc2ae",
      title: commonCode.J.J01,
      start: "2022-02-02",
      end: "2022-02-02",
    },
    {
      title: commonCode.J.J07,
      id: "c3b5c2a2-c3a4-24c2-84c2-86497fc2b539",
      start: "2022-02-23",
      end: "2022-02-25",
    },
  ];

  useEffect(() => {
    const today = new Date();
    testData.forEach((data) => {
      const date = new Date(data.start);
      const dday = date.getTime() - today.getTime();
      if (dday >= 0) {
        const result = Math.ceil(dday / (1000 * 60 * 60 * 24));
        setRecentDday(result);
        setDdayName(data.title);
        return;
      }
    });
  }, []);

  return (
    <Container
      layout
      layoutId="M02"
      whileHover={{
        scale: 1.01,
      }}
      onClick={() => {
        if (setWidgetId) setWidgetId("M02");
      }}
    >
      <Wrapper>
        <Title>D-DAY</Title>
        {setIsShow && <CloseButton onClick={close}>❌</CloseButton>}
      </Wrapper>
      <ContentContainer>
        <Content>D-{recentDday}</Content>
        <Name>{DdayName}</Name>
      </ContentContainer>
    </Container>
  );
};

export default Dday;
