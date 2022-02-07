package com.dd.db.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.board.Comment;
import com.dd.db.entity.board.Community;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
	
	Optional<List<Comment>> findByCommunityAndDelYnAndParentIsNull(Community community, boolean delYn);
	Optional<List<Comment>> findByCommunityAndDelYnAndParentIsNullOrderByRegTime(Community community, boolean delYn);
	Optional<List<Comment>> findByParentLike(Comment parent);
	Optional<List<Comment>> findByDelYnAndParentLikeOrderByRegTime(boolean delYn, Comment parent);
}
