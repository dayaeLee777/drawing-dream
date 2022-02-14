import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledTr = styled.tr`
  &:hover {
    background-color: ${({ theme }) => theme.noticeHoverColor};
  }
  & + & {
    border-top: 1px solid #dedede;
  }
`;

const StyledTd = styled.td`
  height: 3rem;
  vertical-align: middle;
  text-align: ${(props) => props.ta || "center"};
  padding: 0 1.5rem;
`;

const CommunityItem = ({ data, index }) => {
  const Navigate = useNavigate();
  let time = data.regTime.split(" ")[0];
  return (
    <StyledTr onClick={() => Navigate(`./${data.communityId}`)}>
      <StyledTd>{index + 1}</StyledTd>
      <StyledTd ta="left">{data.title}</StyledTd>
      <StyledTd>{data.userName}</StyledTd>
      <StyledTd>{data.hit}</StyledTd>
      <StyledTd>{time}</StyledTd>
    </StyledTr>
  );
};

export default CommunityItem;
