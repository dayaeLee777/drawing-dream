import styled from "styled-components";
import { motion } from "framer-motion";
import blankProfileImg from "assets/img/profile.png";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createChatRoom } from "api/chat";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfileImg } from "api/user";

import { closeChat, openChat } from "modules/chat";

const Container = styled(motion.div)`
  width: 160px;
  height: 160px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.widgetColor};
`;
const Img = styled.img`
  border-radius: 45px;
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
  const { userName, userId } = useSelector((state) => state.user);
  const [profileImg, setProfileImg] = useState("");
  const [roomId, setRoomId] = useState("");
  const { isOpenChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  useEffect(() => {
    getProfileImg(member.userId).then((res) =>
      setProfileImg(res.data.fileName)
    );
  }, [profileImg]);

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
      setRoomId(res.data.roomId);
      dispatch(openChat(res.data.roomId));
    });
  };
  return (
    <>
      <Container
        whileHover={{
          scale: 1.1,
        }}
      >
        <Img src={profileImg ? profileImg : blankProfileImg} />
        <Wrapper>
          <Name>{member.userName}</Name>
          <CreateChat onClick={createChat}>
            <FontAwesomeIcon icon={faCommentDots} size="lg" />
          </CreateChat>
        </Wrapper>
      </Container>
    </>
  );
};

export default Member;
