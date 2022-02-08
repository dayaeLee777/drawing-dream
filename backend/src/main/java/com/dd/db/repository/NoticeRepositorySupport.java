package com.dd.db.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dd.db.entity.board.Notice;
import com.dd.db.entity.user.User;

public interface NoticeRepositorySupport {
	public Page<Notice> findByUserinfo(User user, Pageable pageable);
}
