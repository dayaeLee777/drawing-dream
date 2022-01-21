import Button from "components/commons/button";
import styled from "styled-components";
import profileImg from "assets/profile.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 8rem;
  padding-left: 2rem;
  /* height: fit-content; */
`;

const TextContainer = styled.div`
  width: 100%;
  margin: 2.5rem 1rem;
`;

const Name = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-top: 1rem;
`;

const Profile = () => {
  return (
    <Container>
      <Wrapper>
        <Image src={profileImg}></Image>
        <TextContainer>
          <Name>김하나</Name>
          <Info>싸피고등학교 2학년 6반</Info>
          <Info>학생</Info>
        </TextContainer>
      </Wrapper>
      <Wrapper>
        <Button name="등교하기">프로필 수정</Button>
      </Wrapper>
    </Container>
  );
};

export default Profile;
