import React from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md";
import styled from "styled-components";

const CheckListItemContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  & + & {
    border-top: 1px solid #dee2e6;
  }
`;
const CheckBox = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
  }
  .text {
    margin-left: 0.5rem;
    flex: 1;
  }
  &.checked {
    svg {
      color: #fec25c;
    }
    .text {
      color: #adb5bd;
      text-decoration: line-through;
    }
  }
`;
const Remove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
`;

const CheckListItem = ({ item }) => {
  const { text, checked } = item;
  return (
    <CheckListItemContainer>
      <CheckBox className={checked ? "checked" : ""}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </CheckBox>
      <Remove>
        <MdRemoveCircleOutline />
      </Remove>
    </CheckListItemContainer>
  );
};

export default CheckListItem;
