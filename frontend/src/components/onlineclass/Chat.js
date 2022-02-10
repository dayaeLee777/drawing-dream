import Button from "components/commons/button";
import Input from "components/commons/input";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import styled from "styled-components";

const Container = styled.div`
  width: 23rem;
  border-radius: 10px;
  margin-left: 3vw;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const ChatContainer = styled.div`
  height: 90%;
  width: 100%;
`;

const Content = styled.div`
  width: 80%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  font-weight: 600;
  margin: 0 1rem;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  width: 80%;
`;

const ChatForm = styled.div`
  display: flex;
  input {
    border: 0px solid;
    background-color: #f4f7f9;
    height: 2rem;
    margin-left: 0.5rem;
    width: 75%;
  }

  button {
    width: 4rem;
    margin-left: auto;
    margin-right: 0.5rem;
  }
`;

const Chat = ({ courseId }) => {
  let sockJS = new SockJS("http://localhost:8080/ws-dd");
  let client = Stomp.over(sockJS);
  const token =
    sessionStorage.getItem("access-token") ||
    localStorage.getItem("access-token");

  const [contents, setContents] = useState([]);
  const [message, setMessage] = useState("");
  const { userName, userId } = useSelector((state) => state.user);

  useEffect(() => {
    client.connect(
      {
        Authorization: `Bearer ${token}`,
      },
      (frame) => {
        console.log("STOMP Connection");
        client.subscribe(`/topic/video/${courseId}`, (response) => {
          console.log(response);
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
      <ChatContainer>
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
