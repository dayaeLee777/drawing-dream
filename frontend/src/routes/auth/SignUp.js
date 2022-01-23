import Button from "components/commons/button";
import Input from "components/commons/input";
import React from "react";
import styled, { css } from "styled-components";
import logo from "assets/img/logo.png";

const Container = styled.div`
  display: flex;
  background-color: #fec25c;
  width: 100vw;
  height: 100vh;
  justify-content: center;
`;

const MainContainer = styled.div`
  display: flex;
  min-width: 60rem;
  background-color: white;
  padding-top: 3rem;
  box-shadow: rgba(99, 99, 99, 0.5) 0px 2px 8px 0px;
`;

const FormContainer = styled.div`
  overflow: auto;
  margin: 0 8rem;
  width: 100%;

  button {
    margin-left: 1rem;
  }
`;

const Logo = styled.img`
  width: 7rem;
  height: fit-content;
`;

const Star = styled.article`
  color: red;
  font-size: 1.5rem;
`;

const NoneStar = styled.article`
  padding-right: 0.7rem;
`;

const Desc = styled.div`
  font-size: 2.5rem;
  margin: 3rem 0;
  font-weight: 600;
`;

const Type = styled.div`
  width: 6rem;

  ${(props) =>
    props.small &&
    css`
      width: 3rem;
    `}
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  margin-right: 1rem;
`;

const LongWrapper = styled.div`
  display: flex;
  margin-right: 1rem;

  div {
    width: 10rem;
  }

  article {
    margin-left: 5rem;
  }
`;

const SignUp = () => {
  return (
    <Container>
      <MainContainer>
        <FormContainer>
          <Logo src={logo} alt="logo" />
          <Desc>회원 가입</Desc>
          <InputContainer>
            <Star>*</Star>
            <Type>아이디</Type>
            <Input />
          </InputContainer>

          <InputContainer>
            <Star>*</Star>
            <Type>이름</Type>
            <Input />
          </InputContainer>

          <InputContainer>
            <Wrapper>
              <Star>*</Star>
              <Type>비밀번호</Type>
              <Input />
            </Wrapper>

            <LongWrapper>
              <Star>*</Star>
              <Type>비밀번호 확인</Type>
              <Input />
            </LongWrapper>
          </InputContainer>

          <InputContainer>
            <NoneStar></NoneStar>
            <Wrapper>
              <Type>전화번호</Type>
              <Input />
            </Wrapper>

            <LongWrapper>
              <NoneStar></NoneStar>
              <Type>보호자 전화번호</Type>
              <Input />
            </LongWrapper>
          </InputContainer>

          <InputContainer>
            <Star>*</Star>
            <Type>이메일</Type>
            <Input />
          </InputContainer>

          <InputContainer>
            <NoneStar></NoneStar>
            <Type>주소</Type>
            <Input width="20rem"></Input>
            <Button width="8rem" name="도로명 주소 찾기" height="1.8rem" />
          </InputContainer>

          <InputContainer>
            <NoneStar></NoneStar>
            <Type>상세 주소</Type>
            <Input width="20rem" />
          </InputContainer>

          <InputContainer>
            <Star>*</Star>
            <Type>학교</Type>
            <Input
              placeholder="학교 찾기 버튼을 이용해서 입력해 주세요."
              width="16rem"
            />
            <Button width="5rem" name="학교 찾기" height="1.8rem" />
          </InputContainer>

          <InputContainer>
            <Wrapper>
              <Star>*</Star>
              <Type>학년</Type>
              <Input width="3rem" mr="3rem" />
            </Wrapper>

            <Wrapper>
              <Star>*</Star>
              <Type small>반</Type>
              <Input width="3rem" mr="3rem" />
            </Wrapper>

            <Wrapper>
              <Star>*</Star>
              <Type small>번호</Type>
              <Input width="3rem" mr="3rem" />
            </Wrapper>
          </InputContainer>

          <Button
            mt="3rem"
            mr="1rem"
            width="10rem"
            height="3rem"
            name="가입 신청"
          />
          <Button
            color="#C4C4C4"
            mb="4rem"
            width="10rem"
            height="3rem"
            name="취소"
            hoverColor="#a2a2a2"
          />
        </FormContainer>
      </MainContainer>
    </Container>
  );
};

export default SignUp;
