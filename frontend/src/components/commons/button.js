import styled from "styled-components";

const StyledButton = styled.button`
  width: 10rem;
  height: 2rem;
  background-color: #fec25c;
  border: none;
  font-weight: 600;
  border-radius: 5px;
`;

const Button = ({ name }) => {
  return <StyledButton>{name}</StyledButton>;
};

export default Button;
