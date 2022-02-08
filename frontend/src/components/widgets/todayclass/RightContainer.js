import React from "react";
import styled from "styled-components";
import character from "assets/img/character.png";
import Button from "components/commons/button";
import { createOnlineClass } from "api/onlineclass";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10rem;
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

const RightContainer = () => {
  const navigate = useNavigate();
  const startClass = () => {
    const courseId = "c384c386-c2a0-c38e-c28f-004cc2a7c2bc";
    createOnlineClass({ courseId }).then((res) => {
      console.log(res);
      navigate(`/onlineclass/${courseId}`);
      window.location.reload();
    });
  };
  return (
    <Container>
      <img src={character} alt="캐릭터" />
      <div>
        <div className="text">
          <span className="time">5분 </span>
          뒤에 수업 시작이야!
        </div>
        <div className="text">같이 들어가자!</div>
      </div>
      <Button
        onClick={startClass}
        name="지금 들어가기"
        mt="1.5rem"
        width="14rem"
        height="2.5rem"
      />
    </Container>
  );
};

export default RightContainer;
