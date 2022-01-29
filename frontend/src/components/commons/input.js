import styled from "styled-components";

const StyledInput = styled.input`
  width: ${(props) => (props.width ? props.width : "12rem")};
  height: ${(props) => (props.height ? props.height : "2rem")};
  border-radius: 5px;
  border: 1px solid #787878;
  padding-left: 0.5rem;
  font-size: 1rem;
  margin-top: ${(props) => (props.mt ? props.mt : "")};
  margin-left: ${(props) => (props.ml ? props.ml : "")};
  margin-bottom: ${(props) => (props.mb ? props.mb : "")};
  margin-right: ${(props) => (props.mr ? props.mr : "")};
`;

const Input = (props) => {
  return <StyledInput {...props} placeholder={props.placeholder}></StyledInput>;
};

export default Input;
