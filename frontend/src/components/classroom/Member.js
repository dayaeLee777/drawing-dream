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
  box-shadow: ${({ theme }) => theme.borderShadow};
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
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  svg {
    color: #fec25c;
  }
`;

const Name = styled.div`
  margin-bottom: 1rem;
  text-align: right;
  display: flex;
  justify-content: center;
`;

const CreateChat = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 1rem;
`;

const Member = ({ member }) => {
  const { userName, userId } = useSelector((state) => state.user);
  const [profileImg, setProfileImg] = useState("");
  // const { isOpenChat } = useSelector((state) => state.chat);
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
      dispatch(openChat(res.data.roomId, res.data.users, member.userId));
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
