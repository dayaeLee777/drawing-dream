import Chat from "components/chat/Chat";
import Nav from "components/layout/Nav";
import Layout from "components/layout/SideLayout";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 0fr 2fr;
  grid-gap: 2rem;
  margin: 0 10vw;
`;

const Home = () => {
  return (
    <>
      <Nav />
      <Container>
        <Layout />
        <Outlet />
      </Container>
      <Chat />
    </>
  );
};

export default Home;
