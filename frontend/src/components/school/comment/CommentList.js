import React from 'react';
import CommentItem from './CommentItem';

const CommentList = () => {
  const sampleData = [
    {
      id: 1,
      comment: "좋아요",
      userName: "박학생",
      regTime: "2022. 2. 27",
      communityId: 1,
    },
    {
      id: 2,
      comment: "좋아요",
      userName: "박학생",
      regTime: "2022. 2. 27",
      communityId: 1,
    },
    {
      id: 3,
      comment: "좋아요",
      userName: "박학생",
      regTime: "2022. 2. 27",
      communityId: 1,
    },
  ]
  return (
    <div>
      {sampleData.map(item => (
        <CommentItem data={item} key={item.id} children />
      ))}
    </div>
  );
};

export default CommentList;