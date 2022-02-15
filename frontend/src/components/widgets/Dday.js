import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import commonCode from "config/commonCode";
import { getCalendar } from "api/calendar";
import { useDispatch } from "react-redux";
import { errorAlert } from "modules/alert";
import { logout } from "modules/user";

const Container = styled(motion.div)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: ${({ theme }) => theme.ContainerColor};
  border-radius: 10px;
  max-height: 30rem;
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
  const [recentDday, setRecentDday] = useState();
  const [DdayName, setDdayName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const close = () => {
    const newIsShow = isShow.filter((wid) => {
      return wid !== widgetId;
    });
    setIsShow(newIsShow);
    setIsntShow([...isntShow, widgetId]);
  };

  useEffect(() => {
    const today = new Date();

    if (isLoading) {
      getCalendar()
        .then((res) => {
          let flag = true;
          res.data.calendarGetListResponseDtoList.forEach((cal) => {
            const date = new Date(cal.startDate);
            const dday = date.getTime() - today.getTime();
            if (dday >= 0 && flag) {
              const result = Math.ceil(dday / (1000 * 60 * 60 * 24));
              setRecentDday(result);
              if (cal.testCode) {
                setDdayName(commonCode.J.J10[cal.testCode]);
              } else {
                setDdayName(commonCode.J[cal.calendarCode]);
              }
              flag = false;
            }
          });
        })
        .catch((e) => {
          if (e.response.status === 401) {
            errorAlert(401);
            dispatch(logout());
          } else {
            errorAlert(e.response.status, "캘린더 정보를 읽어오지 못했습니다.");
          }
        });
      setIsLoading(false);
    }
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
        {!isLoading && (
          <>
            <Content>D-{recentDday}</Content>
            <Name>{DdayName}</Name>
          </>
        )}
      </ContentContainer>
    </Container>
  );
};

export default Dday;
