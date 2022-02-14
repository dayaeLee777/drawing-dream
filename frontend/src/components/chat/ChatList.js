import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "components/commons/button";
import Input from "components/commons/input";
import profileImg from "assets/img/profile.png";
import ChatRoom from "components/chat/ChatRoom";
import { getRooms } from "api/chat";
import { useDispatch, useSelector } from "react-redux";
import { openChat } from "modules/chat";

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
  grid-template-columns: 1fr 1fr;
  background: #fec25c;
  height: 70px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: white;
  font-size: 1.5rem;
  line-height: 4rem;
  font-size: 1rem;
`;

const Subject = styled.div`
  text-align: left;
  margin-left: 2rem;
  color: white;
  /* ... 으로 만들어 주는 코드 */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;

const ChatBoxToggle = styled.span`
  text-align: right;
  margin-right: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
    background-color: #5a5eb9;
  }
`;

const List = styled.div`
  /* cursor: pointer; */
  display: grid;
  grid-template-columns: 2fr 8fr 1fr;
  margin-bottom: 1rem;
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
color: black;
`;

const Content = styled.div`
  margin: 0.4rem 0;
  line-height: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.menuColor};

  /* ... 으로 만들어 주는 코드 */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Date = styled.div`
  color: #c4c4c4;
  font-size: 0.8rem;
`;

const Info = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.6;
  color: black;
`;

const ChatList = ({
  contents,
  setContents,
  message,
  setMessage,
  chatClose,
}) => {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [memberId, setMemberId] = useState("");
  const { userName, userId } = useSelector((state) => state.user);
  const { roomId } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  useEffect(() => {
    getRooms().then((res) => {
      console.log(res);
      setRooms(res.data.rooms);
    });
  }, []);

  return (
    <>
      {roomId && (
        <ChatRoom
          roomId={roomId}
          // setRoomId={setRoomId}
          users={users}
          memberId={memberId}
          chatClose={chatClose}
          message={message}
          setMessage={setMessage}
          contents={contents}
          setContents={setContents}
          key={roomId}
        ></ChatRoom>
      )}
      <ChatBox style={roomId ? { display: "none" } : {}}>
        <ChatBoxHeader>
          <Subject>채팅</Subject>
          <ChatBoxToggle onClick={chatClose}>
            <i className="material-icons">close</i>
          </ChatBoxToggle>
        </ChatBoxHeader>
        <ChatBoxBody>
          <ChatBoxOverlay />
          <ChatLogs>
            {rooms.length > 0 ? (
              <>
                {rooms.map((room) => (
                  <List
                    key={room.roomId}
                    onClick={() => {
                      dispatch(openChat(room.roomId));
                      setUsers(room.users);
                      room.users.map((user) => {
                        if (user.userId !== userId) {
                          setMemberId(user.userId);
                        }
                      });
                    }}
                  >
                    <Image src={profileImg}></Image>
                    <Middle>
                      <Name>
                        {room.users.map((user, i) => (
                          <div key={i}>
                            {user.userId !== userId && <>{user.userName}</>}
                          </div>
                        ))}
                      </Name>
                      {room.message && (
                        <Content>{room.message.content}</Content>
                      )}
                    </Middle>
                    {room.message && (
                      <Date>{room.message.sendTime.slice(11, 16)}</Date>
                    )}
                  </List>
                ))}
              </>
            ) : (
              <Info>
                현재 진행 중인 채팅이 없습니다. <br />
                우리 반 보기에서 친구들과 채팅을 시작하세요!
              </Info>
            )}
          </ChatLogs>
        </ChatBoxBody>
      </ChatBox>
    </>
  );
};

export default ChatList;
