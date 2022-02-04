import React from 'react';
import styled from 'styled-components';

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
  text-align: ${props=> props.ta || "center"};
  padding: 0 1.5rem;
`;

const CommunityItem = ({data, setCommunityId}) => {
  const onSetCommunityId = () => {
    setCommunityId(data.id);
  }
  return (
    <StyledTr onClick={onSetCommunityId}>
      <StyledTd>{data.id}</StyledTd>
      <StyledTd ta="left">{data.title}</StyledTd>
      <StyledTd>{data.hit}</StyledTd>
      <StyledTd>{data.regTime}</StyledTd>
    </StyledTr>
  );
};

export default CommunityItem;