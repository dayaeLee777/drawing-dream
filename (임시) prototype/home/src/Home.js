import styled from "styled-components";
import Profile from "./components/Profile";
import SideMenu from "./components/SideMenu";
import Widgets from "./components/Widgets";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  font-family: "Noto Sans KR", sans-serif;
`;
const Wrapper = styled.div`
  padding-left: 5rem;
`;

const Home = () => {
  return (
    <Container>
      <Wrapper>
        <Profile></Profile>
        <SideMenu></SideMenu>
      </Wrapper>
      <Widgets></Widgets>
    </Container>
  );
};

export default Home;
