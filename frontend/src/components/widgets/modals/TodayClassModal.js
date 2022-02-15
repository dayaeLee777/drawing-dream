import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import LeftContainer from "../todayclass/LeftContainer";
import RightContainer from "../todayclass/RightContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOnlineClass } from "api/onlineclass";
import { getCouresInfo } from "api/course";
import { getNowPeriod } from "../../../modules/time";

const Wrapper = styled(motion.div)`
  width: 1000px;
  height: 700px;
  padding: 2rem 3rem;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: ${({ theme }) => theme.widgetColor};
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  letter-spacing: -1px;
  box-sizing: border-box;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100%;
    margin: 10px 20px -40px;
  }
  button {
    width: 14rem;
    height: 2.5rem;
    margin-top: 2rem;
  }
`;

const TodayClassModal = ({ layoutId }) => {
  const { todayData, period } = useSelector((state) => state.timetable); // 오늘 수업 데이터와 현재 교시
  const [nowPeriod, setNowPeriod] = useState(); // 현재 교시 정보
  const [courseInfo, setCourseInfo] = useState(); // 현재 수업 정보(교사이름, 과목 코드)
  const [isLoading, setIsLoading] = useState(false); // 수업 정보 받아오는 로딩 state
  const [courseId, setCourseId] = useState(""); // courseInfo
  const [files, setFiles] = useState(); // 파일 입력 state
  const navigate = useNavigate();
  const onClick = (event) => {
    event.stopPropagation();
  };

  // 수업 개설 및 수업 자료 업로드
  const startClass = () => {
    let formData = new FormData();
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("multipartFile", files[i]);
      }
    }
    formData.append(
      "onlineClassRegisterRequestDTO",
      new Blob(
        [
          JSON.stringify({
            courseId,
          }),
        ],
        { type: "application/json" }
      )
    );
    getCouresInfo(courseId).then((res) => {
      if (res.data.onlineClassId) {
        navigate(`/onlineclass/${courseId}`);
      } else {
        createOnlineClass(formData).then(() => {
          navigate(`/onlineclass/${courseId}`);
        });
      }
    });
  };
  // END

  // 오늘 수업 리스트에서 지금현재 수업과 일치하는 항목 뽑아서 courseId 설정
  useEffect(() => {
    if (todayData.length > 0) {
      const periodCode = getNowPeriod(period);
      setNowPeriod(periodCode);
      for (let data of todayData) {
        if (data.periodCode === periodCode) setCourseId(data.courseId);
      }
      setIsLoading(true);
    }
  }, []);
  // END

  // 위에서 설정한 courseId로 수업 정보 뽑아서 courseInfo 설정
  useEffect(() => {
    if (isLoading && nowPeriod) {
      getCouresInfo(courseId).then((res) => {
        setCourseInfo(res.data);
        setIsLoading(false);
      });
    }
  }, [isLoading]);
  // END
  return (
    <Wrapper onClick={onClick} layoutId={layoutId}>
      {/* 현재 교시 정보와 수업 정보가 있을 때 근데 이거 조건없이 넘겨야 하는데
      isLoading이랑 coureInfo로 값 넘기고 nowPeriod로는 뒤에 수업 정보 없다고 띄워야 됨 */}
      {!isLoading && courseInfo && (
        <LeftContainer
          courseInfo={courseInfo} // 현재 교시 수업 정보
          period={nowPeriod} // 현재 교시
          todayData={todayData}
          setFiles={setFiles}
          files={files}
          courseId={courseId}
        />
      )}
      {isLoading && !courseInfo && <LeftContainer todayData={todayData} />}

      <RightContainer
        courseInfo={courseInfo}
        startClass={startClass}
        nowPeriod={nowPeriod}
      />
    </Wrapper>
  );
};

export default TodayClassModal;
