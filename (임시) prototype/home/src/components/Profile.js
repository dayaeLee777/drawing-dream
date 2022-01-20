import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 23rem;
  height: 15rem;
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
    0 16px 16px rgba(0, 0, 0, 0.12);
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

const EditButton = styled.button`
  width: 18rem;
  margin: 1.5rem;
  background-color: #fec25c;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  padding: 0.5rem;
  font-family: "Noto Sans KR", sans-serif;
`;

const Profile = () => {
  return (
    <Container>
      <Wrapper>
        <Image src="././profile.png"></Image>
        <TextContainer>
          <Name>김하나</Name>
          <Info>싸피고등학교 2학년 6반</Info>
        </TextContainer>
      </Wrapper>
      <EditButton>프로필 수정</EditButton>
    </Container>
  );
};

export default Profile;
