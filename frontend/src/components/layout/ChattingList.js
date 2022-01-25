import React from "react";
import styled from "styled-components";
import Button from "components/commons/button";
import Input from "components/commons/input";
import profileImg from "assets/img/profile.png";



const ChatBox = styled.div`
  display:block;
  background: #efefef;
  position:fixed;
  right:110px;
  bottom:120px;
  width:350px;
  max-width: 85vw;
  max-height:100vh;
  border-radius:5px;  
  box-shadow: 0px 5px 35px 9px #ccc;
`;

const ChatBoxHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #fec25c;
  height:70px;
  border-top-left-radius:5px;
  border-top-right-radius:5px; 
  color:white;
  font-size:1.5rem;
  line-height: 4rem;
`;

const Subject = styled.div`
  text-align: left;
  margin-left: 2rem;
  color: white;
`;

const ChatBoxToggle = styled.span`
  text-align:right;
  margin-right:2rem;
  cursor:pointer;
`;

const ChatBoxBody = styled.div`
  position: relative;  
  height:370px;  
  height:auto;
  border:1px solid #ccc;  
  overflow: hidden;

  &::after {
    content: "";
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=');
    opacity: 0.1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height:100%;
    position: absolute;
    z-index: -1;  
  }
`;

const ChatBoxOverlay = styled.div`

`;

const ChatLogs = styled.div`
  padding:15px; 
  height:370px;
  overflow-y:scroll;

  &::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #F5F5F5;
  }

  &::-webkit-scrollbar{
    width: 5px;  
    background-color: #F5F5F5;
  }

  &::-webkit-scrollbar-thumb{
  	background-color: #5A5EB9;
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
`;

const Image = styled.img`
  width: 3rem;
`;

const Middle = styled.div`
  display: grid;
  grid-template-rows: 0fr 1fr;
  font-size: 1rem;
  max-width: 12rem;
`;

const Name = styled.div`

`;

const Content = styled.div`
  margin: 0.4rem 0;
  line-height: 1.5rem;
`;

const Date = styled.div`
  color: #C4C4C4;
  font-size: 0.8rem;
`;

const ChatInput = styled.div`
  background: #f4f7f9;
  width:81%; 
  position:relative;
  height:47px;  
  padding-top:10px;
  padding-right:50px;
  padding-bottom:10px;
  padding-left:15px;
  border:none;
  resize:none;
  outline:none;
  border:1px solid #ccc;
  color:#888;
  border-top:none;
  border-bottom-right-radius:5px;
  border-bottom-left-radius:5px;
  overflow:hidden; 

`;

const ChattingList = ({chatClose}) => {
  const onCloseChat = (e) => {
    console.log('e.target: ', e.target)
    console.log('e.tarcurrentTargetget: ', e.currentTarget)
    if(e.target === e.currentTarget){
        chatClose()
      }
    }
  return (
    <>
    <ChatBox>
      <ChatBoxHeader>
        <Subject>채팅</Subject>
        <ChatBoxToggle
          onClick={chatClose}>
          <i class="material-icons">close</i>
        </ChatBoxToggle>
      </ChatBoxHeader>
      <ChatBoxBody>
        <ChatBoxOverlay />   
        <ChatLogs>
          <List>
            <Image src={profileImg}></Image>
            <Middle>
              <Name>인주비</Name>
              <Content>약속은 없는데 야구 봐야 됨</Content>
            </Middle>
            <Date>오전 10:41</Date>
          </List>

          <List>
            <Image src={profileImg}></Image>
            <Middle>
              <Name>이다예</Name>
              <Content>이것은 테스트 메시지입니다.</Content>
            </Middle>
            <Date>오전 10:40</Date>
          </List>

          <List>
            <Image src={profileImg}></Image>
            <Middle>
              <Name>손창현</Name>
              <Content>쓸 말이 없어서 그냥 쓰는 중</Content>
            </Middle>
            <Date>오전 10:39</Date>
          </List>

          <List>
            <Image src={profileImg}></Image>
            <Middle>
              <Name>박기범</Name>
              <Content>아 이제 무슨 말을 써야하지</Content>
            </Middle>
            <Date>오전 10:38</Date>
          </List>

          <List>
            <Image src={profileImg}></Image>
            <Middle>
              <Name>제진명</Name>
              <Content>서울 6반 7팀 화이팅~!~!</Content>
            </Middle>
            <Date>오전 10:37</Date>
          </List>

        </ChatLogs>
      </ChatBoxBody>
    </ChatBox>
  </>
  );
};

export default ChattingList;
