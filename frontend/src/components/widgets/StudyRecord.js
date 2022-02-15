import styled from "styled-components";
import { motion } from "framer-motion";
import Chart from "./studyrecord/Chart";
import { useEffect, useState } from "react";
import { getRecordList } from "api/studyrecord";
import { errorAlert } from "modules/alert";
import { useDispatch } from "react-redux";
import { logout } from "modules/user";

const Container = styled(motion.div)`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: ${({ theme }) => theme.ContainerColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  max-height: 40rem;
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

const StudyRecord = ({
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

  const [records, setRecords] = useState([]);
  const [isListLoading, setIsListLoading] = useState(true);
  const dispatch = useDispatch();

  const date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  const studyDate = date.getFullYear() + "-" + month + "-" + day;

  useEffect(() => {
    if (isListLoading) {
      getRecordList(studyDate)
        .then((res) => {
          setRecords(res.data.studyRecordResponseDtoList);
          setIsListLoading(false);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            errorAlert(401);
            dispatch(logout());
          } else {
            errorAlert(e.response.status, "공부 기록을 불러오지 못했습니다.");
          }
        });
    }
  }, [isListLoading]);
  return (
    <Container
      layout
      layoutId="M06"
      whileHover={{
        scale: 1.01,
      }}
      onClick={() => {
        if (setWidgetId) setWidgetId("M06");
      }}
    >
      <Wrapper>
        <Title>오늘의 공부 시간</Title>
        {setIsShow && <CloseButton onClick={close}>❌</CloseButton>}
      </Wrapper>
      {!isListLoading && <Chart records={records} />}
    </Container>
  );
};

export default StudyRecord;
