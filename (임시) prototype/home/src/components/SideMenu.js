import styled from "styled-components";

const Container = styled.div`
  width: 20rem;
  margin-top: 4rem;
`;

const Menu = styled.div`
  background-color: #f1f1f1;
  width: 23rem;
  height: 4rem;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const SideMenu = () => {
  return (
    <Container>
      <Menu>1</Menu>
      <Menu>2</Menu>
      <Menu>3</Menu>
    </Container>
  );
};

export default SideMenu;
