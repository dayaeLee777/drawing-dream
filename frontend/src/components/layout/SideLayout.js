import Profile from "components/layout/Profile";
import SideMenu from "components/layout/SideMenu";
import styled from "styled-components";

const SideWrapper = styled.div`
  width: 25rem;
  display: grid;
  grid-template-rows: 0fr 2fr;
  grid-gap: 2rem;
`;

const Layout = () => {
  return (
    <>
      <SideWrapper>
        <Profile />
        <SideMenu />
      </SideWrapper>
    </>
  );
};

export default Layout;
