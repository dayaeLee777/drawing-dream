import { useEffect, useRef, useState } from "react";
import Button from "components/commons/button";
import Input from "components/commons/input";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { login } from "modules/user";
import { useCookies } from "react-cookie";
import AnimatedCharacters from "components/signin/AnimatedText";
import { motion } from "framer-motion";
import first from "assets/img/first.png";
import signin from "assets/img/signin.jpg";
import signin2 from "assets/img/signin2.png";

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  width: 100vw;
  height: 100vh;
`;

const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fec25c;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ImgSlider = styled.div`
  width: 300%;
  height: 100%;
  overflow: hidden;
`;
const ImgContainer = styled.div`
  margin-top: 10%;
  height: 70%;
  transition: ease 1000ms;
  display: flex;
  width: 300%;
  white-space: nowrap;
`;
const Img = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: inline-block;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.8;
  /* transform: ${(props) => `translate3d(${props.index * 100}%, 0, 0)`}; */
`;

const Desc = styled(motion.div)`
  padding: 3rem;
  font-weight: 600;
  font-size: 2rem;
  position: absolute;
  left: 0;
  bottom: 0;
  h1 {
    height: 6rem;
  }
  span {
    height: 4rem;
    text-align: center;
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
  font-size: 2rem;
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
  { type: "heading1", text: "세상에서", color: "#814a23" },

  {
    type: "heading1",
    text: "가장 편한 학교",
    color: "#814a23",
  },
  {
    type: "heading1",
    text: "세상에서 가장 편한 학교, Drawing Dream",
    color: "#562909",
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
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["myWidgets"]);
  const images = [signin, first, signin2];
  const timeoutRef = useRef(null);
  const [index, setIndex] = useState(0);

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

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      4000
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <Container>
      <SideContainer>
        <Wrapper>
          <ImgSlider>
            <ImgContainer
              style={{ transform: `translate3d(${-index * (100 / 3)}%, 0, 0)` }}
            >
              {images.map((img, index) => (
                <Img key={index} url={img} />
              ))}
            </ImgContainer>
          </ImgSlider>

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
        </Wrapper>
      </SideContainer>
      <Form onSubmit={onSubmit}>
        <Logo src="././logo.png" />
        <Welcome>여러분의 꿈을 그려 보세요</Welcome>
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
            onChange={() => setIsChecked(!isChecked)}
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
