import SockJS from "sockjs-client";
import Stomp from "stompjs";
import styled from "styled-components";

const Container = styled.div`
  width: 23rem;
  border-radius: 10px;
  margin-left: 3vw;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Chat = () => {
  let sockJS = new SockJS("http://localhost:8080/ws-dd");
  let client = Stomp.over(sockJS);
  return <Container>hi</Container>;
};

export default Chat;
