import Button from "components/commons/button";
import Input from "components/commons/input";
import React from "react";
import styled from "styled-components";
import logo from "assets/logo.png";

const Container = styled.div`
  display: flex;
  background-color: #fec25c;
  width: 100vw;
`;

const MainContainer = styled.div`
  display: flex;
  width: 50vw;
  margin-left: 25vw;
  background-color: white;
  padding-top: 3rem;
`;

const FormContainer = styled.div`
  margin: 0 3rem;
  width: 100%;

  button {
    margin-left: 1rem;
  }
`;

const Logo = styled.img`
  width: 7rem;
  height: fit-content;
`;

const Desc = styled.div`
  font-size: 2.5rem;
  margin: 3rem 0;
  font-weight: 600;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const Type = styled.div`
  width: 5.5rem;
`;

const SignUp = () => {
  return (
    <Container>
      <MainContainer>
        <FormContainer>
          <Logo src={logo} />
          <Desc>회원 가입</Desc>
          <InputContainer>
            <Type>아이디</Type>
            <Input></Input>
          </InputContainer>

          <InputContainer>
            <Type>이름</Type>
            <Input></Input>
          </InputContainer>

          <InputContainer>
            <Type>비밀번호</Type>
            <Input></Input>
            <Type>비밀번호 확인</Type>
            <Input></Input>
          </InputContainer>

          <InputContainer>
            <Type>전화번호</Type>
            <Input></Input>
            <Type>보호자 전화번호</Type>
            <Input></Input>
          </InputContainer>

          <InputContainer>
            <Type>이메일</Type>
            <Input></Input>
          </InputContainer>

          <InputContainer>
            <Type>주소</Type>
            <Input></Input>
            <Button name="도로명 주소 찾기" />
          </InputContainer>

          <InputContainer>
            <Type>상세 주소</Type>
            <Input></Input>
          </InputContainer>

          <InputContainer>
            <Type>학교</Type>
            <Input></Input>
            <Button name="학교 찾기" />
          </InputContainer>

          <InputContainer>
            <Type>학년</Type>
            <Input></Input>
            <Type>반</Type>
            <Input></Input>
            <Type>번호</Type>
            <Input></Input>
          </InputContainer>

          <Button name="가입 신청" />
          <Button name="취소" />
        </FormContainer>
      </MainContainer>
    </Container>
  );
};

export default SignUp;
