import { useEffect, useState } from "react";
import Button from "components/commons/button";
import Input from "components/commons/input";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { login } from "modules/user";
import { useCookies } from "react-cookie";
import AnimatedCharacters from "components/signin/AnimatedText";
import { motion } from "framer-motion";

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
  /* background-color: #fef1db;
  opacity: 1;
  background-image: linear-gradient(#fec25c 4px, transparent 4px),
    linear-gradient(to right, #fec25c 4px, #fef1db 4px);
  background-size: 80px 80px; */
  background-color: #fff;
  background-image: linear-gradient(
      90deg,
      transparent 79px,
      #fec25c 79px,
      #fec25c 81px,
      transparent 81px
    ),
    linear-gradient(#eee 0.1em, transparent 0.1em);
  background-size: 100% 2em;
`;

const Desc = styled(motion.div)`
  font-size: 3rem;
  padding: 10rem;
  font-weight: 600;
  h1 {
    height: 6rem;
  }
  span {
    height: 6rem;
  }
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
  margin-bottom: 3rem;
  margin-top: 3rem;
  font-weight: 600;
  letter-spacing: -1px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Type = styled.div`
  width: 5.5rem;
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
`;

const Error = styled.div`
  color: red;
`;

const LinkContainer = styled.div`
  width: fit-content;
  margin-top: 3rem;
  padding-bottom: 1rem;

  &:hover {
    text-shadow: -0.5px -0.5px 0 black;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
`;
const placeholderText = [
  { type: "heading1", text: "세상에서" },

  {
    type: "heading1",
    text: "가장 편한 학교",
  },
  {
    type: "heading1",
    text: "Drawing Dream",
  },
];

const container = {
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};
const SignIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { error } = useSelector((state) => state.user);
  const [cookies, setCookie, removeCookie] = useCookies(["myWidgets"]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!cookies.myWidgets) {
      setCookie("myWidgets", ["M01", "M02", "M03", "M04"], { path: "/" });
    }
  }, []);
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
      const user = {
        loginId: id,
        password,
      };
      dispatch(login(user, isChecked));
    } catch (error) {}
  };

  return (
    <Container>
      <SideContainer>
        <Desc
          className="App"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {placeholderText.map((item, index) => {
            return <AnimatedCharacters {...item} key={index} />;
          })}
        </Desc>
      </SideContainer>
      <Form onSubmit={onSubmit}>
        <Logo src="././logo.png" />
        <Welcome>좋은 아침이에요!</Welcome>
        <InputContainer>
          {/* <Type>아이디</Type> */}
          <Input
            name="id"
            type="id"
            value={id}
            onChange={onChange}
            placeholder="아이디"
            height="2.5rem"
            br="10px"
            require
          ></Input>
        </InputContainer>
        <InputContainer>
          {/* <Type>비밀번호</Type> */}
          <Input
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            placeholder="비밀번호"
            height="2.5rem"
            br="10px"
            require
          ></Input>
        </InputContainer>
        <InputContainer>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(true)}
          />
          <Type>로그인 유지</Type>
        </InputContainer>
        <InputContainer>
          {error && <Error>아이디, 비밀번호를 확인해 주세요</Error>}
        </InputContainer>
        <Button mt="1rem" height="3rem" br="30px" name="로그인" />
        <LinkContainer>
          <Link to={"/signup"}>→ 아직 회원이 아니신가요?</Link>
        </LinkContainer>
      </Form>
    </Container>
  );
};

export default SignIn;
