import styled from "styled-components";
import linkImg from "assets/img/link.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: #f1f1f1;
  height: 4rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  color: ${({ theme }) => theme.menuColor};
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

const SideMenuItem = ({ url, path, name }) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(url)}>
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
