import Button from "components/commons/button";
import Input from "components/commons/input";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import styled from "styled-components";

const Container = styled.div`
  width: 23rem;
  border-radius: 10px;
  margin-left: 3vw;
  box-shadow: ${({ theme }) => theme.chatboxShadow};
  border: 1px solid #ffffff30;
  padding-bottom: 0.5rem;
`;

const ChatContainer = styled.div`
  height: 90%;
  width: 100%;
  overflow: auto;
`;

const Content = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  line-height: 1.5rem;
`;

const Name = styled.div`
  font-weight: 600;
  margin: 0.1rem 1rem;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  width: 65%;
  word-break: break-all;
`;

const ChatForm = styled.div`
  display: flex;
  input {
    border: 0px solid;
    background-color: #f4f7f9;
    height: 2rem;
    margin: 0 0.5rem;
    width: 75%;
  }

  button {
    width: 4rem;
    margin-left: auto;
    margin-right: 0.5rem;
  }
`;

const Chat = ({ courseId }) => {
  let sockJS = new SockJS("https://i6a607.p.ssafy.io/ws-dd");
  let client = Stomp.over(sockJS);
  const token =
    sessionStorage.getItem("access-token") ||
    localStorage.getItem("access-token");

  const [contents, setContents] = useState([]);
  const [message, setMessage] = useState("");
  const { userId } = useSelector((state) => state.user);
  const messageBoxRef = useRef();
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [contents]);

  useEffect(() => {
    client.connect(
      {
        Authorization: `Bearer ${token}`,
      },
      (frame) => {
        console.log("STOMP Connection");
        client.subscribe(`/topic/video/${courseId}`, (response) => {
          setContents((prev) => [...prev, JSON.parse(response.body)]);
        });
      }
    );
    return () => client.disconnect();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };

  const onClick = (event) => {
    event.preventDefault();
    client.send(
      "/app/chat/video",
      {
        Authorization: `Bearer ${token}`,
      },
      JSON.stringify({ courseId, userId, content: message })
    );
    setMessage("");
  };

  return (
    <Container>
      <ChatContainer ref={messageBoxRef}>
        {contents.map((content, index) => (
          <Content key={index}>
            <Name>{content.userName}</Name>
            <Message>{content.content}</Message>
          </Content>
        ))}
      </ChatContainer>
      <ChatForm>
        <Input
          value={message}
          onChange={onChange}
          placeholder="Send a message..."
        />
        <Button onClick={onClick} name="전송" />
      </ChatForm>
    </Container>
  );
};

export default Chat;
