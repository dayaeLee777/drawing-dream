import Button from "components/commons/button";
import Input from "components/commons/input";
import React from "react";
import styled from "styled-components";

const Register = styled.div`
    display: flex;
    flex-direction: column;
    margin: 3rem auto 3rem 3rem;
    width: 90%;
    font-weight: bold;
    font-size: 1.5rem;

`;

const TitleSubject = styled.div`
  text-align: left;
  width: 100%;
  margin-bottom: 2rem;

  input {
      margin-left: 1.5rem;
      }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;

    textarea{
        width: 100%;
        height: 30rem;
    }
`;

const Subject = styled.div`
    margin-bottom: 1rem;
`;

const ButtonArea = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;
    margin-top: 3rem;
    width: 25rem;

`;

const CommuRegister = ({setList, setView}) => {
    const onList = () => {
        setList (true)
        setView (false)
        };

    return (
        <Register>
            <TitleSubject>제목
                <Input placeholder="제목" />
            </TitleSubject>

            <Content>
                <Subject>내용</Subject>
                <textarea></textarea>
                <ButtonArea>
                    <Button name="쓰기" onClick={onList}></Button>
                    <Button name="취소" onClick={onList}></Button>
                </ButtonArea>
            </Content>

        </Register>
    );
};

export default CommuRegister;