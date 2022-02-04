import React from "react";
import styled from "styled-components";
import Input from "./input";
import ValidContainer from "./validContainer";

const InputBlock = styled.div`
  display: flex;
  margin-bottom: 1rem;
  .type {
    width: 8rem;
    height: 2rem;
    display: flex;
    align-items: center;
    .star {
      padding-top: 0.5rem;
      margin-left: 0.5rem;
      align-items: center;
      color: red;
      font-size: 1.5rem;
    }
  }
`;

const InputContainer = (props) => {
  return (
    <InputBlock>
      <div className="type">
        {props.desc}
        {props.star && <div className="star">*</div>}
      </div>
      <Input
        onChange={props.onChange}
        name={props.name}
        type={props.type ? props.type : "text"}
        width={props.width}
        value={props.value}
      />
      <ValidContainer isValid={props.isValid} errMsg={props.errMsg} />
    </InputBlock>
  );
};

export default InputContainer;
