import Widgets from "components/home/Widgets";
import Nav from "components/layout/Nav";
import Profile from "components/layout/Profile";
import SideMenu from "components/layout/SideMenu";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 10vw;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 1fr 3fr;
`;
const SideWrapper = styled.div`
  display: grid;
  grid-template-rows: 0fr 2fr;
  grid-gap: 2rem;
`;

const Home = () => {
  return (
    <>
      <Nav></Nav>
      <Container>
        <SideWrapper>
          <Profile />
          <SideMenu />
        </SideWrapper>
        <Widgets />
      </Container>
    </>
  );
};

export default Home;
