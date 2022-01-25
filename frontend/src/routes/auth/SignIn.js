import { useState } from "react";
import Button from "components/commons/button";
import Input from "components/commons/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { login } from "modules/user";

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  width: 100vw;
  height: 100vh;
`;

const SideContainer = styled.div`
  background-color: #fec25c;
  display: flex;
  align-items: center;
`;

const Desc = styled.div`
  font-size: 1.5rem;
  padding: 10rem;
  margin-top: 30rem;
`;

const Form = styled.form`
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

const Welcome = styled.div`
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
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "id") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(login({ loginId: id, password }));
    } catch {}
  };

  return (
    <Container>
      <SideContainer>
        <Desc>세상에서 가장 편한 학교, Drawing Dream</Desc>
      </SideContainer>
      <Form onSubmit={onSubmit}>
        <Logo src="././logo.png" />
        <Welcome>환영합니다</Welcome>
        <InputContainer>
          <Type>아이디</Type>
          <Input
            name="id"
            type="id"
            value={id}
            onChange={onChange}
            require
          ></Input>
        </InputContainer>
        <InputContainer>
          <Type>비밀번호</Type>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            require
          ></Input>
        </InputContainer>
        <InputContainer>
          <input type="checkbox" /> 로그인 유지
        </InputContainer>
        <Button name="로그인" />
        <Link to={"/signup"}>→ 아직 회원이 아니신가요?</Link>
      </Form>
    </Container>
  );
};

export default SignIn;
