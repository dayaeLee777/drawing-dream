import Button from "components/commons/button";
import styled from "styled-components";
import profileImg from "assets/img/profile.png";
import hand from "assets/img/waving-hand.png";
import { useSelector } from "react-redux";
import commonCode from "config/commonCode";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: ${({ theme }) => theme.widgetColor};
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.div`
  input{
    display: none;
  }
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
  const navigate = useNavigate();
  const { userName, schoolName, gradeCode, classCode, userCode, isAttend } =
    useSelector((state) => state.user);
  const onClick = () => {
    navigate("/lookup");
  };
  return (
    <Container>
      <Wrapper>
        <ProfileImage>
          <label for="file-input">
            <Image src={profileImg} accept="image/*" />
          </label>
          <input id="file-input" type="file"/>
        </ProfileImage>
        <TextContainer>
          <Name>{userName}</Name>
          <Info>{schoolName}</Info>
          <Info>
            {commonCode.E[gradeCode]} {commonCode.F[classCode]}
          </Info>
          <Info>{commonCode.A[userCode]}</Info>
        </TextContainer>
      </Wrapper>
      <Wrapper>
        {isAttend ? (
          <Button
            mb="2rem"
            width="17rem"
            height="2.5rem"
            name="하교하기"
            onClick={onClick}
          />
        ) : (
          <>
            <Button
              mb="2rem"
              width="17rem"
              height="2.5rem"
              name="등교하기"
              onClick={onClick}
            ></Button>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Profile;
