import styled from "styled-components";
import linkImg from "assets/img/link.png";

const Container = styled.div`
  cursor: pointer;
  background-color: ${(props) => (props.bc ? "#fec25c" : "#f1f1f1")};
  height: 4rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  color: ${(props) => (props.co ? "black" : "#828282")};
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2rem;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.img`
  width: 2rem;
  margin-right: 1rem;
`;

const SideMenuItem = ({ onClick, url, path, name, isSelected }) => {
  return (
    <Container
      onClick={() => onClick(url)}
      bc={isSelected === url ? true : false}
      co={isSelected === url ? true : false}
    >
      <Content>
        <Title>
          <Icon src={path} />
          {name}
        </Title>
        <img src={linkImg} />
      </Content>
    </Container>
  );
};

export default SideMenuItem;
