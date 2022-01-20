import Button from "components/commons/button";
import Input from "components/commons/input";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  width: 100vw;
  height: 100vh;
`;

const SideContainer = styled.div`
  background-color: #fec25c;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 3rem;

  a {
    text-decoration: none;
    color: black;
    margin-top: 3rem;
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

const SignIn = () => {
  return (
    <Container>
      <SideContainer>side</SideContainer>
      <FormContainer>
        <Logo src="././logo.png" />
        <Desc>환영합니다</Desc>
        <InputContainer>
          <Type>아이디</Type>
          <Input></Input>
        </InputContainer>
        <InputContainer>
          <Type>비밀번호</Type>
          <Input type="password"></Input>
        </InputContainer>
        <InputContainer>
          <input type="checkbox" /> 로그인 유지
        </InputContainer>
        <Button name="로그인" />
        <Link to={"/signup"}>→ 아직 회원이 아니신가요?</Link>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
