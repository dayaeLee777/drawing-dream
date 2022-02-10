import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatList from "./ChatList";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useSelector } from "react-redux";

const Container = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  color: #fec25c;
  padding: 28px;
  cursor: pointer;
  text-align: center;
  line-height: 5rem;
  font-size: 2.3rem;
  /* box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.6),
    0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12); */
  svg {
    filter: drop-shadow(6px 6px 5px #a8a8a8);
  }
`;

const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [contents, setContents] = useState([]);
  const { userName, userId } = useSelector((state) => state.user);
  let sockJS = new SockJS("http://localhost:8080/ws-dd");
  let client = Stomp.over(sockJS);
  const token =
    sessionStorage.getItem("access-token") ||
    localStorage.getItem("access-token");
  useEffect(() => {
    client.connect(
      {
        Authorization: `Bearer ${token}`,
      },
      (frame) => {
        console.log("STOMP Connection");
        client.subscribe(`/topic/one/${userId}`, (response) => {
          setContents((prev) => [...prev, JSON.parse(response.body)]);
          console.log(response);
        });
        // client.send(
        //   "/app/chat/enter",
        //   {
        //     Authorization: `Bearer ${token}`,
        //   },
        //   JSON.stringify({ roomId })
        // );
      }
    );

    return () => client.disconnect();
  }, []);
  const chatClose = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <>
      <Container onClick={chatClose}>
        <FontAwesomeIcon icon={faCommentDots} size="2x" />
      </Container>

      {chatOpen && (
        <ChatList
          message={message}
          setMessage={setMessage}
          contents={contents}
          setContents={setContents}
          chatClose={chatClose}
        ></ChatList>
      )}
    </>
  );
};

export default Chat;
