import React, { useEffect, useState } from "react";
import styled from "styled-components";
import profileImgDefault from "assets/img/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { openChat } from "modules/chat";
import { getProfileImg } from "api/user";

const List = styled.div`
  /* cursor: pointer; */
  display: grid;
  grid-template-columns: 2fr 8fr 1fr;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 45px;
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

const ChatItem = ({ room }) => {
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [profileImg, setProfileImg] = useState();

  useEffect(() => {
    if (isLoading) {
      for (let user of room.users) {
        if (user.userId !== userId) {
          console.log(user.userId);
          getProfileImg(user.userId).then((res) => {
            console.log(res.data.fileName);
            setProfileImg(res.data.fileName);
            setIsLoading(false);
          });
        }
      }
    }
  }, [isLoading]);

  const onClick = () => {
    room.users.map((user) => {
      if (user.userId !== userId) {
        dispatch(openChat(room.roomId, room.users, user.userId));
      }
    });
  };
  return (
    <List onClick={onClick}>
      {!isLoading && profileImg ? (
        <Image src={profileImg} />
      ) : (
        <Image src={profileImgDefault} />
      )}
      <Middle>
        <Name>
          {room.users.map((user, i) => (
            <div key={i}>{user.userId !== userId && <>{user.userName}</>}</div>
          ))}
        </Name>
        {room.message && <Content>{room.message.content}</Content>}
      </Middle>
      {room.message && <Date>{room.message.sendTime.slice(11, 16)}</Date>}
    </List>
  );
};

export default ChatItem;
