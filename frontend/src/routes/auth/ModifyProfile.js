import Button from "components/commons/button";
import Input from "components/commons/input";
import React from "react";
import styled from "styled-components";
import blankProfile from "assets/blank-profile.png";

const Container = styled.div`
  width: 50rem;
  height: 40rem;
  box-sizing: border-box;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
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
  font-size: 1.3rem;
  margin: 2rem 0;
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
  margin-bottom: 1rem;
`;

const Type = styled.div`
  text-align: right;
  width: 7rem;
  padding-right: 1rem;
`;

const ModifyProfile = () => {
  return (
    <Container>
      <Desc>프로필 수정</Desc>

      <InnerContainer>
        <ProfileImageContainer>
          <img src={blankProfile}></img>
          <Button name="파일찾기" />
        </ProfileImageContainer>
        <ModifyContainer>
          <InputContainer>
            <Type>이름</Type>
          </InputContainer>
          <InputContainer>
            <Type>학번</Type>
          </InputContainer>
          <InputContainer>
            <Type>이메일</Type>
            <Input />
          </InputContainer>
          <InputContainer>
            <Type>현재 비밀번호</Type> <Input />
          </InputContainer>
          <InputContainer>
            <Type>새 비밀번호</Type> <Input />
          </InputContainer>
          <InputContainer>
            <Type>새 비밀번호 확인</Type> <Input />
          </InputContainer>
          <InputContainer>
            <Type>전화번호</Type> <Input />
          </InputContainer>
          <InputContainer>
            <Type>주소</Type> <Input /> <Button name="주소찾기" />
          </InputContainer>
          <InputContainer>
            <Type>상세 주소</Type> <Input />
          </InputContainer>
        </ModifyContainer>
      </InnerContainer>
      <InputContainer>
        <Button name="수정하기" mr="1rem" />
        <Button name="취소" color="#c4c4c4" />
      </InputContainer>
    </Container>
  );
};

export default ModifyProfile;
