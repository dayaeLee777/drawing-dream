import { deleteCheckList, modifyCheckList } from "api/checklist";
import { errorAlert } from "modules/alert";
import { logout } from "modules/user";
import React from "react";

import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const CheckListItemContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
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

const CheckListItem = ({ item, setIsListLoading, main }) => {
  const { content, checked } = item;
  const dispatch = useDispatch();

  const onCheck = () => {
    modifyCheckList({
      ...item,
      checklistId: item.cheklistId,
      checked: !item.checked,
    })
      .then(() => {
        setIsListLoading(true);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          errorAlert(401);
          dispatch(logout());
        } else {
          errorAlert(e.response.status, "체크리스트 수정에 실패했습니다.");
        }
      });
  };
  const onRemove = () => {
    deleteCheckList(item.cheklistId)
      .then(() => {
        setIsListLoading(true);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          errorAlert(401);
          dispatch(logout());
        } else {
          errorAlert(e.response.status, "체크리스트 삭제에 실패했습니다.");
        }
      });
  };
  return (
    <CheckListItemContainer>
      <CheckBox className={checked ? "checked" : ""}>
        {checked ? (
          <MdCheckBox onClick={main ? null : onCheck} />
        ) : (
          <MdCheckBoxOutlineBlank onClick={main ? null : onCheck} />
        )}
        <div className="text">{content}</div>
      </CheckBox>
      {!main && (
        <Remove onClick={onRemove}>
          <MdRemoveCircleOutline />
        </Remove>
      )}
    </CheckListItemContainer>
  );
};

export default CheckListItem;
