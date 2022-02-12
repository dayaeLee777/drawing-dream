import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatList from "./ChatList";
import {
  faCommentDots,
  faCircle,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useDispatch, useSelector } from "react-redux";
import { closeChat, openChat } from "modules/chat";

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
  .fa-comment-dots {
    filter: drop-shadow(6px 6px 5px #a8a8a8);
  }
  .fa-bell {
    position: absolute;
    right: -10px;
    top: 20px;
    content: attr(data-count);
    font-size: 40%;
    padding: 0.6em;
    border-radius: 999px;
    line-height: 0.75em;
    color: white;
    background: rgba(255, 0, 0, 0.85);
    text-align: center;
    min-width: 2em;
    font-weight: bold;
  }
`;

const Chat = () => {
  // const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [contents, setContents] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const { userName, userId } = useSelector((state) => state.user);
  const { isOpenChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

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
          setIsNew(true);
        });
      }
    );

    return () => client.disconnect();
  }, []);
  const chatClose = () => {
    if (isOpenChat) {
      dispatch(closeChat());
    } else {
      dispatch(openChat());
    }
    setIsNew(false);
  };

  return (
    <>
      <Container onClick={chatClose}>
        <FontAwesomeIcon icon={faCommentDots} size="2x" />
        {isNew && !isOpenChat && <FontAwesomeIcon icon={faBell} size="2x" />}
      </Container>

      {isOpenChat && (
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
