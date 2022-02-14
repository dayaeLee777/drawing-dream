import Button from "components/commons/button";
import styled from "styled-components";
import profileImg from "assets/img/profile.png";
import edit from "assets/img/pngegg.png";
import { useSelector } from "react-redux";
import commonCode from "config/commonCode";
import { useNavigate } from "react-router-dom";
import { profileImage } from "api/user";
import { getDept } from "api/user";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: ${({ theme }) => theme.ContainerColor};
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  button {
    cursor: pointer;
  }
`;

const ProfileImage = styled.div`
  position: relative;
  top: 1rem;
  input {
    display: none;
  }
`;

const Image = styled.img`
  display: inline;
  border-radius: 4rem;
  height: 8rem;
  width: 8rem;
  margin-left: 2rem;
  cursor: pointer;
`;

const Edit = styled.img`
  position: relative;
  top: -2rem;
  left: 8rem;
  background-color: ${({ theme }) => theme.ContainerColor};
  cursor: pointer;
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
  const state = useSelector((state) => state);
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const formData = new FormData();
  const onFileUpload = (e) => {
    let file_kind = e.target.value.lastIndexOf(".");
    let file_name = e.target.value.substring(file_kind + 1, e.length);
    let file_type = file_name.toLowerCase();
    let check_file_type = new Array();
    check_file_type = ["jpg", "gif", "png", "jpeg"];

    if (check_file_type.indexOf(file_type) == -1) {
      alert("이미지 파일만 선택할 수 있습니다.");
      return false;
    }

    formData.append("multipartFile", e.target.files[0]);
    profileImage(formData).then(() => {
      setIsLoading(true);
    });
    // getDept(state.user.userId).then(
    //   (res) => (
    //     setImage(res.data.fileName)),
    //   window.location.reload(),
    //   setIsLoading(true),
    // )
    // setIsLoading(true);
  };
  const onClick = () => {
    navigate("/meeting");
  };

  useEffect(() => {
    if (isLoading) {
      getDept(state.user.userId).then(
        (res) => setImage(res.data.fileName),
        setIsLoading(false)
        // window.location.reload()
      );
    }
  }, [isLoading]);

  return (
    <Container>
      <Wrapper>
        <ProfileImage>
          <label htmlFor="file-input">
            {image ? (
              <Image src={image} alt="이미지를 찾을 수 없습니다." />
            ) : (
              <Image src={profileImg} alt="이미지를 찾을 수 없습니다." />
            )}
            <Edit src={edit} />
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/gif, image/jpeg, image/png, image/jpg"
            onChange={onFileUpload}
          />
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
