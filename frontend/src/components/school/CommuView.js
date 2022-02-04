import Button from "components/commons/button";
import Input from "components/commons/input";
import React from "react";
import styled from "styled-components";

const Register = styled.div`
    display: flex;
    flex-direction: column;
    margin: 3rem auto 3rem 3rem;
    width: 90%;
    font-size: 1.5rem;
    line-height: 2rem;
`;

const Main = styled.div``;

const TitleSubject = styled.div`
    font-weight: bold;
    text-align: left;
    width: 100%;
    margin-bottom: 1rem;

    input {
        margin-left: 1.5rem;
        }
`;

const Info = styled.div`
    background-color: #dca03a;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    width: 100%;
`;

const Person = styled.div`
`;

const Date = styled.div`
`;

const Content = styled.div`
    height: 30rem;
    width: 100%;
    border: 1px solid black;
    padding: 1rem;
    margin-bottom: 2rem;
`;

const Commend = styled.div`
`;

const InputLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 3rem;
    
    input{
        width: 70%;
        margin-right: 3rem;
    }
    
    button{
        width: 20%;
        height: 2.3rem;
    }
`;

const CommendLine = styled.div`
    margin-bottom: 3rem;
`;

const CommendContent = styled.div`
    height: 10rem;
    width: 100%;
    border: 1px solid black;
    padding: 1rem;
    margin-bottom: 1rem;
    overflow-y: auto;
`;


const CommuView = ({setList, setView}) => {
    const onList = () => {
        setList (true)
        setView (false)
        };

    return (
        <Register>
            <Button name="메인 화면" onClick={onList} />
            <Main>
                <TitleSubject>제목입니당</TitleSubject>
                <Info>
                    <Person>사람입니당</Person>
                    <Date>날짜입니당</Date>
                </Info>
                <Content>내용입니당</Content>
            </Main>

            <Commend>
                <TitleSubject>댓글</TitleSubject>
                <InputLine>
                    <Input placeholder="댓글을 입력해주세요." />
                    <Button name="댓글 입력" />
                </InputLine>

                <CommendLine>
                    <Info>
                        <Person>댓글 사람입니당</Person>
                        <Date>댓글 날짜입니당</Date>
                    </Info>
                    <CommendContent>댓글 내용입니당</CommendContent>
                </CommendLine>

                
                <CommendLine>
                    <Info>
                        <Person>댓글 사람입니당</Person>
                        <Date>댓글 날짜입니당</Date>
                    </Info>
                    <CommendContent>댓글 내용입니당</CommendContent>
                </CommendLine>
            </Commend>
        </Register>
    );
};

export default CommuView;