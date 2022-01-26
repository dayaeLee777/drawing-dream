import Button from "components/commons/button";
import Input from "components/commons/input";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import blankProfile from "assets/img/blank-profile.png";
import NewWindow from "react-new-window";
import PostCode from "components/signup/postcode/FindPostCode";
import { getUser } from "api/user";
import { useSelector } from "react-redux";

const FormContainer = styled.div`
  /* width: 50rem;
  height: 40rem; */
  box-sizing: border-box;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 7fr;
  margin-bottom: 3rem;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    border-radius: 100px;
    width: 5rem;
    height: 5rem;
    margin-bottom: 1rem;
  }
`;
const Desc = styled.div`
  font-size: 1.8rem;
  margin: 3rem 0;
  font-weight: 600;
`;

const ModifyContainer = styled.div`
  display: flex;
  padding-right: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const Type = styled.div`
  text-align: right;
  width: 7rem;
  padding-right: 2rem;
`;

const ModifyProfile = () => {
  const [isPostCodeOpen, setIsPostCodeOpen] = useState(false);
  const [fullAddress, setFullAddress] = useState("주소를 입력해주세요");
  const [zoneCode, setZoneCode] = useState("");
  const { userId, userName } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getUser(userId).then((response) => {
      const data = response.data;
      console.log(data);
      setFullAddress(data.address);
      setEmail(data.userEmail);
      setPhone(data.phone);
    });
  }, []);
  const openPostCode = () => {
    setIsPostCodeOpen(true);
  };

  const closePostCode = () => {
    setIsPostCodeOpen(false);
  };

  return (
    <>
      {isPostCodeOpen && (
        <NewWindow title="주소찾기" onUnload={closePostCode}>
          <PostCode
            setFullAddress={setFullAddress}
            setZoneCode={setZoneCode}
            onClose={closePostCode}
          />
        </NewWindow>
      )}

      <FormContainer>
        <Desc>프로필 수정</Desc>

        <InnerContainer>
          <ProfileImageContainer>
            <img src={blankProfile} alt="blank-profile"></img>
            <Button width="6rem" name="파일 찾기" />
          </ProfileImageContainer>
          <ModifyContainer>
            <InputContainer>
              <Type>이름</Type>
              {userName}
            </InputContainer>
            <InputContainer>
              <Type>학번</Type>
              A111122001
            </InputContainer>
            <InputContainer>
              <Type>이메일</Type>
              <Input
                width="13rem"
                border="1px solid #C4C4C4"
                defaultValue={email}
              />
            </InputContainer>
            <InputContainer>
              <Type>현재 비밀번호</Type>
              <Input border="1px solid #C4C4C4" type="password" />
            </InputContainer>
            <InputContainer>
              <Type>새 비밀번호</Type>
              <Input border="1px solid #C4C4C4" type="password" />
            </InputContainer>
            <InputContainer>
              <Type>새 비밀번호 확인</Type>
              <Input border="1px solid #C4C4C4" type="password" />
            </InputContainer>
            <InputContainer>
              <Type>전화번호</Type>
              <Input
                width="9rem"
                border="1px solid #C4C4C4"
                defaultValue={phone}
              />
            </InputContainer>
            <InputContainer>
              <Type>주소</Type>
              <Input
                width="20rem"
                border="1px solid #C4C4C4"
                value={fullAddress}
                readOnly
              />
              <Button
                ml="1rem"
                width="6rem"
                name="주소 찾기"
                onClick={openPostCode}
              />
            </InputContainer>
            <InputContainer>
              <Type>상세 주소</Type>
              <Input width="20rem" border="1px solid #C4C4C4" />
            </InputContainer>
          </ModifyContainer>
        </InnerContainer>
        <InputContainer>
          <Button name="수정하기" mr="1rem" width="7rem" />
          <Button
            name="취소"
            color="#c4c4c4"
            width="7rem"
            hoverColor="#a2a2a2"
          />
        </InputContainer>
      </FormContainer>
    </>
  );
};

export default ModifyProfile;
