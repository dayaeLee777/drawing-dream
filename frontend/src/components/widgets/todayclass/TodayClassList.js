import React from 'react';
import styled from 'styled-components';
import CourseName from './CourseName';

const ListContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const TodayClassList = (props) => {
  const data = props.data;
  return (
      <ListContainer>
        {data.map((course, idx) => (
          <CourseName key={idx} data={course} now={idx === 0 ? true : false} />
        ))}
      </ListContainer>
  );
};

export default TodayClassList;