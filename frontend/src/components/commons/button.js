import styled, { css } from "styled-components";

const StyledButton = styled.button`
  width: 10rem;
  height: 2rem;
  background-color: #fec25c;
  border: none;
  font-weight: 600;
  border-radius: 5px;
  font-family: "Noto Sans KR", sans-serif;
  transition: 0.2s;
  font-size: 1rem;

  &:hover {
    background-color: #dca03a;
  }

  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}
  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
    `}

${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `}

  ${(props) =>
    props.color &&
    css`
      background-color: ${props.color};
    `}

  ${(props) =>
    props.hoverColor &&
    css`
      &:hover {
        background-color: ${props.hoverColor};
      }
    `}
  
  ${(props) =>
    props.mt &&
    css`
      margin-top: ${props.mt};
    `}
  ${(props) =>
    props.mb &&
    css`
      margin-bottom: ${props.mb};
    `}
  ${(props) =>
    props.ml &&
    css`
      margin-left: ${props.ml};
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
