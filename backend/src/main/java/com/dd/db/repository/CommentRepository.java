package com.dd.db.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.board.Comment;
import com.dd.db.entity.board.Community;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
	
	Optional<List<Comment>> findByCommunityAndParentIsNull(Community community);
	Optional<List<Comment>> findByCommunityAndParentIsNullOrderByRegTime(Community community);
	Optional<List<Comment>> findByParentLike(Comment parent);
	Optional<List<Comment>> findByParentLikeOrderByRegTime(Comment parent);
}
