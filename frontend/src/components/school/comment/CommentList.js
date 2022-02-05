import { getCommentList } from 'api/community';
import React, { useEffect, useState } from 'react';
import CommentItem from './CommentItem';

const CommentList = ({communityId}) => {
  const [commentList, setCommentList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      getCommentList(communityId)
      .then(res => {
        setCommentList(res.data.commentGetListResponseDtoList);
        setIsLoading(false);
      })
    }
  }, [isLoading]);

  // const sampleData = [
  //   {
  //     id: 1,
  //     comment: "좋아요",
  //     userName: "박학생",
  //     regTime: "2022. 2. 27",
  //     communityId: 1,
  //   },
  //   {
  //     id: 2,
  //     comment: "좋아요",
  //     userName: "박학생",
  //     regTime: "2022. 2. 27",
  //     communityId: 1,
  //   },
  //   {
  //     id: 3,
  //     comment: "좋아요",
  //     userName: "박학생",
  //     regTime: "2022. 2. 27",
  //     communityId: 1,
  //   },
  // ]
  return (
    <div>
      {commentList && commentList.map(item => (
        <CommentItem data={item} key={item.commentId} communityId={communityId} children/>
      ))}
    </div>
  );
};

export default CommentList;