import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatList from "./ChatList";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const chatClose = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <>
      <Container onClick={chatClose}>
        <FontAwesomeIcon icon={faCommentDots} size="2x" />
      </Container>

      {chatOpen && <ChatList chatClose={chatClose}></ChatList>}
    </>
  );
};

export default Chat;
