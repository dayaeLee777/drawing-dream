package com.dd.db.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dd.db.entity.board.Notice;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.enums.Code;

public interface NoticeRepositorySupport {
	
	Page<Notice> findByUserinfoWithPaging(User user, Pageable pageable);
	
	long countByUser(User user);
	
	Optional<Notice> findMeetingNotice(LocalDateTime regStartDate, LocalDateTime regEndDate, Code meetingCode, UserDepartment userDepartment);
}
