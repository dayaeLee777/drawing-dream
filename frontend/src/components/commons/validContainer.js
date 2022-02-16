import React from "react";
import styled from "styled-components";

const ValidBlock = styled.div`
  align-items: center;
  margin-left: 1rem;
  height: 2rem;
  display: flex;
  color: ${(props) => (props.isValid ? "blue" : "red")};
  font-size: 0.8rem;
  min-width: 11rem;
`;

const ValidContainer = (props) => {
  return <ValidBlock isValid={props.isValid}>{props.errMsg}</ValidBlock>;
};

export default ValidContainer;
