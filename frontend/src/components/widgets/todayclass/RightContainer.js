import React, { useEffect, useState } from "react";
import styled from "styled-components";
import character from "assets/img/character.png";
import Button from "components/commons/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import teacher2 from "assets/img/teacher2.png";
import { compareTime } from "../../../modules/time";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
  }
  .text {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    .time {
      color: #ed7331;
    }
  }
`;

const Notice = styled.div`
  width: 100%;
  line-height: 1.6;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 1.1rem;
`;

const RightContainer = ({ courseInfo, nowPeriod, startClass }) => {
  const { userCode, userName } = useSelector((state) => state.user);
  const { period } = useSelector((state) => state.timetable);
  const navigate = useNavigate();
  const [timeDiff, setTimeDiff] = useState();
  const moveClass = () => {
    navigate(`/onlineclass/${courseInfo.courseId}`);
  };
  useEffect(() => {
    if (nowPeriod) {
      const periodIndex = nowPeriod ? nowPeriod.slice(2, 3) : null;
      const diff = compareTime(period[periodIndex].startTime);
      setTimeDiff(diff);
    }
  }, [nowPeriod]);

  return (
    <>
      {userCode === "A03" && (
        <Container>
          <img src={teacher2} alt="캐릭터" />
          <Button
            onClick={startClass}
            width="14rem"
            height="2.5rem"
            disabled={
              nowPeriod && courseInfo && courseInfo.teacherName === userName
                ? ""
                : "disabled"
            }
            name="수업 시작하기"
          />
        </Container>
      )}
      {userCode === "A04" && (
        <Container>
          <img src={character} alt="캐릭터" />
          {courseInfo && courseInfo.onlineClassId ? (
            <>
              {timeDiff > 0 ? (
                <div>
                  <div className="text">
                    <span className="time">{timeDiff}분</span>
                    뒤에 수업 시작이야!
                  </div>
                  <div className="text">같이 들어가자!</div>
                </div>
              ) : (
                <div>
                  <div className="text">
                    수업 시작한 지{" "}
                    <span className="time">{Math.abs(timeDiff)}분</span>이
                    지났어!
                  </div>
                  <div className="text">얼른 들어가자!</div>
                </div>
              )}
              <Button
                onClick={moveClass}
                name="지금 들어가기"
                mt="1.5rem"
                width="14rem"
                height="2.5rem"
                disabled={courseInfo ? "" : "disabled"}
              />
            </>
          ) : (
            <Notice>
              아직 수업이 개설되지 않았습니다. <br />
              선생님께서 수업을 개설할 때까지 <br />
              조금만 기다려 주세요!
            </Notice>
          )}
        </Container>
      )}
    </>
  );
};

export default RightContainer;
