import styled from "styled-components";
import { motion } from "framer-motion";
import profileImg from "assets/img/profile.png";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createChatRoom } from "api/chat";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Container = styled(motion.div)`
  /* width: 10rem; */
  height: 10rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Img = styled.img`
  width: 50%;
`;

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 4fr 1fr;

  svg {
    color: #fec25c;
  }
`;

const Name = styled.div`
  margin-bottom: 1.5rem;
  text-align: right;
  margin-right: 2rem;
`;

const CreateChat = styled.div``;

const Member = ({ member }) => {
  let sockJS = new SockJS("http://localhost:8080/ws-dd");
  let client = Stomp.over(sockJS);
  const token =
    sessionStorage.getItem("access-token") ||
    localStorage.getItem("access-token");

  const { userName, userId } = useSelector((state) => state.user);
  const createChat = () => {
    createChatRoom({
      name: userName + ", " + member.userName,
      userList: [
        {
          userId: member.userId,
        },
      ],
    }).then((res) => {
      console.log(res);
      // client.disconnect();
      // client.connect(
      //   {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   (frame) => {
      //     console.log("STOMP Connection");
      // client.subscribe(`/topic/one/${member.userId}`, (response) => {
      //   // setContents((prev) => [...prev, JSON.parse(response.body)]);
      //   console.log(response);
      // });
      // client.send(
      //   "/app/chat/enter",
      //   {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   JSON.stringify({ roomId })
      // );
      //   }
      // );
    });
  };
  return (
    <Container
      whileHover={{
        scale: 1.1,
      }}
    >
      <Img src={profileImg} />
      <Wrapper>
        <Name>{member.userName}</Name>
        <CreateChat onClick={createChat}>
          <FontAwesomeIcon icon={faCommentDots} size="lg" />
        </CreateChat>
      </Wrapper>
    </Container>
  );
};

export default Member;
