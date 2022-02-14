import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "components/commons/button";
import Input from "components/commons/input";
import profileImg from "assets/img/profile.png";
import ChatList from "components/chat/ChatList";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch, useSelector } from "react-redux";
import { getChatList } from "api/chat";
import { openChatList } from "modules/chat";

const ChatBox = styled.div`
  display: block;
  background: #efefef;
  position: fixed;
  right: 110px;
  bottom: 120px;
  width: 350px;
  max-width: 85vw;
  max-height: 100vh;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const ChatBoxHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: #fec25c;
  height: 70px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: white;
  font-size: 1.5rem;
  line-height: 4rem;
  font-size: 1rem;
`;

const Arrow = styled.div`
  margin-left: 2rem;
  cursor: pointer;
`;

const Subject = styled.div`
  text-align: center;
  color: white;
`;

const ChatBoxToggle = styled.span`
  text-align: right;
  margin-right: 2rem;
  cursor: pointer;
`;

const ChatBoxBody = styled.div`
  position: relative;
  height: 370px;
  height: auto;
  border: 1px solid #ccc;
  overflow: hidden;

  &::after {
    content: "";
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=");
    opacity: 0.1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    position: absolute;
    z-index: -1;
  }
`;

const ChatBoxOverlay = styled.div``;

const ChatLogs = styled.div`
  padding: 15px;
  height: 370px;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #fec25c;
  }
`;

const Me = styled.div`
  background-color: #fec25c;
  display: table;
  max-width: 12rem;
  margin-left: auto;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: black;
`;

const You = styled.div`
  background-color: white;
  display: table;
  max-width: 12rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: black;
`;

const ChatInput = styled.div`
  background: #f4f7f9;
  width: 81%;
  position: relative;
  height: 47px;
  padding-top: 10px;
  padding-right: 50px;
  padding-bottom: 10px;
  padding-left: 15px;
  border: none;
  resize: none;
  outline: none;
  border: 1px solid #ccc;
  color: #888;
  border-top: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  overflow: hidden;
`;

const ChatForm = styled.form`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding-top: 0.5rem;
  border: 1px solid #c4c4c4;
  width: 110%;
  height: 80%;

  input {
    border: 0px solid;
    background-color: #f4f7f9;
    height: 2rem;
    margin-left: 0.5rem;
    width: 100%;
  }

  button {
    width: 4rem;
    margin-left: auto;
    margin-right: 0.5rem;
  }
`;

const ChatRoom = ({
  contents,
  setContents,
  message,
  setMessage,
  roomId,
  chatClose,
}) => {
  const [chatMove, setChatMove] = useState(false);
  const messageBoxRef = useRef();
  const { userName, userId } = useSelector((state) => state.user);
  const { users, memberId } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const sockJS = new SockJS("http://localhost:8080/ws-dd");
  const client = Stomp.over(sockJS);

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  const back = () => {
    dispatch(openChatList());
    client.disconnect();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };

  const token =
    sessionStorage.getItem("access-token") ||
    localStorage.getItem("access-token");

  useEffect(() => {
    getChatList(roomId).then((res) => {
      setContents(res.data.messages);
    });
    client.connect(
      {
        Authorization: `Bearer ${token}`,
      },
      (frame) => {
        console.log("STOMP Connection");
        console.log(memberId);
        client.subscribe(`/topic/one/${memberId}`, (response) => {
          console.log(response);
          setContents((prev) => [...prev, JSON.parse(response.body)]);
        });
      }
    );
    return () => client.disconnect();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [contents]);

  const onClick = (event) => {
    event.preventDefault();
    client.send(
      "/app/chat/one",
      {
        Authorization: `Bearer ${token}`,
      },
      JSON.stringify({ roomId, userId: memberId, content: message })
    );
    setMessage("");
  };

  return (
    <>
      <ChatBox style={chatMove ? { display: "none" } : {}}>
        <ChatBoxHeader>
          <Arrow onClick={back}>←</Arrow>
          <Subject>
            {users.map((user, index) => (
              <div key={index}>
                {user.userName !== userName && <>{user.userName}</>}
              </div>
            ))}
          </Subject>
          <ChatBoxToggle onClick={chatClose}>
            <i className="material-icons">close</i>
          </ChatBoxToggle>
        </ChatBoxHeader>
        <ChatBoxBody>
          <ChatBoxOverlay />
          <ChatLogs ref={messageBoxRef}>
            {contents.map((content, index) => (
              <div key={index}>
                {content.userId === userId ? (
                  <Me>{content.content}</Me>
                ) : (
                  <You>{content.content}</You>
                )}
              </div>
            ))}
          </ChatLogs>
        </ChatBoxBody>
        <ChatInput>
          <ChatForm>
            <Input
              value={message}
              onChange={onChange}
              placeholder="Send a message..."
            />
            <Button onClick={onClick} name="전송" />
          </ChatForm>
        </ChatInput>
      </ChatBox>
    </>
  );
};

export default ChatRoom;
