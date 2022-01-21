import React from "react";
import logo from "assets/logo.png";
import signOut from "assets/sign-out.png";
import cog from "assets/cog.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: 2rem 10vw;
  justify-content: space-between;
`;
const Item = styled.div`
  width: 6rem;
  color: #828282;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 5rem;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: fit-content;
  height: fit-content;
  padding: 0.5rem;
`;

const Nav = () => {
  return (
    <Container>
      <Item>
        <Logo src={logo}></Logo>
      </Item>
      <MenuWrapper>
        <Item>
          <Icon src={cog} />
          설정
        </Item>
        <Item>
          <Icon src={signOut} />
          로그아웃
        </Item>
      </MenuWrapper>
    </Container>
  );
};

export default Nav;
