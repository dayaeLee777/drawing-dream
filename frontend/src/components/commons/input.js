import styled, { css } from "styled-components";

const StyledInput = styled.input`
  width: 9rem;
  height: 1.5rem;
  border-radius: 5px;
  border: 1px solid #787878;

  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}
  ${(props) =>
    props.border &&
    css`
      border: ${props.border};
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

const Input = (props) => {
  return <StyledInput {...props} placeholder={props.placeholder}></StyledInput>;
};

export default Input;
