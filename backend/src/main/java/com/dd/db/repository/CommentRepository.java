package com.dd.db.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dd.db.entity.board.Comment;

public interface CommentRepository extends JpaRepository<Comment, UUID> {

}
