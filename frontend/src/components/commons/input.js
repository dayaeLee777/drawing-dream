import styled from "styled-components";

const StyledInput = styled.input`
  width: 9rem;
  height: 1.5rem;
  border-radius: 5px;
  border: 1px solid #787878;
`;

const Input = ({ placeholder }) => {
  return <StyledInput placeholder={placeholder}></StyledInput>;
};

export default Input;
