import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledTr = styled.tr`
  &:hover {
    background-color: #f2f2f2;
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

const CommunityItem = ({ data }) => {
  const Navigate = useNavigate();
  return (
    <StyledTr onClick={() => Navigate(`./${data.communityId}`)}>
      <StyledTd>{data.communityId}</StyledTd>
      <StyledTd ta="left">{data.title}</StyledTd>
      <StyledTd>{data.userId}</StyledTd>
      <StyledTd>{data.hit}</StyledTd>
      <StyledTd>{data.regTime}</StyledTd>
    </StyledTr>
  );
};

export default CommunityItem;
