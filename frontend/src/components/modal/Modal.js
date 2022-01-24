import React from "react";
import Button from "components/commons/button";
import styled from "styled-components";

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;

  modal{
    display: grid;
    width: 680px;
    height: 310px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    z-index:100;

    button{
      position: relative;
      left: 50%;
      top:40%;
      width: 15rem;
      height: 3rem;
      border-radius: 10px;
      transform: translate(-50%, -50%);
    }
  }
`

const Subject = styled.div`
  position: relative;
  text-align:center;
  top:50%;
  font-size: 2.5rem;
  font-weight: bold;
`;

const Content = styled.div`
  position: relative;
  text-align:center;
  top:30%;
  font-size: 1.5rem;
`;

const Modal = ({modalClose}) => {

  const onCloseModal = (e) => {
    console.log('e.target: ', e.target)
    console.log('e.tarcurrentTargetget: ', e.currentTarget)
    if(e.target === e.currentTarget){
        modalClose()
      }
    }
    return (
        <ModalContainer onClick={onCloseModal}>
            <modal>
                <Subject>출석 완료!</Subject>
                <Content>2022년 1월 6일 출석되었습니다.</Content>
                <Button
                onClick={modalClose}
                name="메인으로 돌아가기"
                />
            </modal>
        </ModalContainer>
    )
}

export default Modal