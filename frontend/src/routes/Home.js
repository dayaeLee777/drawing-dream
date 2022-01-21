import Widgets from "components/home/Widgets";
import Nav from "components/layout/Nav";
import Profile from "components/layout/Profile";
import SideMenu from "components/layout/SideMenu";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 10vw;
  display: grid;
  grid-template-columns: 1fr 3fr;
`;
const SideWrapper = styled.div`
  display: grid;
  width: fit-content;
  grid-template-rows: 1fr 2fr;
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
