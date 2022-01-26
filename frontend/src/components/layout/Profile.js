import Button from "components/commons/button";
import styled from "styled-components";
import profileImg from "assets/img/profile.png";
import hand from "assets/img/waving-hand.png";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: ${({ theme }) => theme.widgetColor};
  height: 1fr;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 8rem;
  padding-left: 2rem;
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 2rem 1rem;
`;

const Name = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  margin-bottom: 0.5rem;
`;

const Profile = () => {
  const { userId } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Image src={profileImg}></Image>
        <TextContainer>
          <Name>김하나</Name>
          <Info>싸피고등학교</Info>
          <Info>2학년 6반</Info>
          <Info>학생</Info>
        </TextContainer>
      </Wrapper>
      <Wrapper>
        <Button
          mb="2rem"
          width="17rem"
          height="2.5rem"
          name="등교하기"
        ></Button>
      </Wrapper>
    </Container>
  );
};

export default Profile;
