import styled, { css } from "styled-components";

const StyledButton = styled.button`
  width: 10rem;
  height: 2rem;
  background-color: #fec25c;
  border: none;
  font-weight: 600;
  border-radius: 5px;

  ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
    `}
  ${(props) =>
    props.mr &&
    css`
      margin-right: ${props.mr};
    `}
`;

const Button = (props) => {
  return <StyledButton {...props}>{props.name}</StyledButton>;
};

export default Button;
