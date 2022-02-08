import styled from "styled-components";
import { motion } from "framer-motion";
import CheckListItems from "components/widgets/checklist/CheckListItems";
import { useEffect, useState } from "react";

const Container = styled(motion.div)`
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

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5rem;
  padding-right: 5rem;
  height: 85%;
`;

const CheckList = ({
  widgetId,
  setWidgetId,
  isShow,
  setIsShow,
  isntShow,
  setIsntShow,
}) => {
  const close = () => {
    const newIsShow = isShow.filter((wid) => {
      return wid !== widgetId;
    });
    setIsShow(newIsShow);
    setIsntShow([...isntShow, widgetId]);
  };
  const [isListLoading, setIsListLoading] = useState(true);
  useEffect(() => {
    if (!isListLoading) {
      setIsListLoading(true);
    }
  }, [widgetId]);
  return (
    <Container
      layout
      layoutId="M03"
      whileHover={{
        scale: 1.01,
      }}
      onClick={() => {
        if (setWidgetId) setWidgetId("M03");
      }}
    >
      <Wrapper>
        <Title>체크 리스트</Title>
        {setIsShow && <CloseButton onClick={close}>❌</CloseButton>}
      </Wrapper>
      <Content>
        <CheckListItems
          main
          isListLoading={isListLoading}
          setIsListLoading={setIsListLoading}
        />
      </Content>
    </Container>
  );
};

export default CheckList;
