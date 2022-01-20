import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding: 0 4rem;
  height: 3rem;
  font-family: "Noto Sans KR", sans-serif;
`;

const Logo = styled.img`
  width: 5rem;
  height: fit-content;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

const NavBar = () => {
  return (
    <Container>
      <Item>
        <Logo src="././logo.png" />
      </Item>
      <Item>로그아웃</Item>
    </Container>
  );
};

export default NavBar;
