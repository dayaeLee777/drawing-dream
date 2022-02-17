import React from "react";
import Button from "components/commons/button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ModalContainer = styled.div`
  width: 20rem;
  height: 11rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  position: absolute;
  top: 5%;
  left: ${(props) => (props.left ? props.left : "32%")};
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 2rem;
`;

const Content = styled.div`
  /* position: relative;
  top: 30%; */
  height: 40%;
  margin-top: 2rem;
  text-align: center;
  font-size: 1.2rem;
  color: black;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-around;
`;

const Modal = (props) => {
  const navigate = useNavigate();
  return (
    <ModalContainer {...props}>
      <Content>{props.message}</Content>
      <ButtonContainer>
        <Button
          width="5rem"
          height="2.5rem"
          onClick={() => {
            if (props.url) {
              navigate(props.url);
            } else {
              props.setShowModal(false);
            }
          }}
          name="확인"
        />
        <Button
          bc="#C4C4C4"
          hoverColor="#a2a2a2"
          width="5rem"
          height="2.5rem"
          onClick={() => props.setShowModal(false)}
          name="취소"
        />
      </ButtonContainer>
    </ModalContainer>
  );
};

export default Modal;
