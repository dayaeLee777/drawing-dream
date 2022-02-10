package com.dd.db.repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.board.Notice;
import com.dd.db.entity.board.QNotice;
import com.dd.db.entity.user.QUserDepartment;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.enums.Code;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class NoticeRepositorySupportImpl implements NoticeRepositorySupport {

	private final JPAQueryFactory jpaQueryFactory;

	QNotice qNotice = QNotice.notice;
	QUserDepartment qUserDepartment = QUserDepartment.userDepartment;
	
	public Page<Notice> findByUserinfoWithPaging(User user, Pageable pageable) {
		
		UserDepartment userDepartment = jpaQueryFactory
				.select(qUserDepartment)
				.from(qUserDepartment)
				.where(
						qUserDepartment.user.eq(user),
						qUserDepartment.delYn.isFalse())
				.fetchOne();
		
		List<Code> classCode = Arrays.asList(Code.K03, Code.K04, Code.K05);
		
		List<Notice> uuidAll = new ArrayList<Notice>();
		
		List<Notice> uuidBySchool= jpaQueryFactory
				.select(qNotice)
				.from(qNotice)
				.where(
						
						qNotice.school.eq(userDepartment.getSchool()),
						qNotice.noticeCode.eq(Code.K01),
						qNotice.delYn.isFalse()
						)
				.fetch();
		uuidAll.addAll(uuidBySchool);
		
		List<Notice> uuidByGrade= jpaQueryFactory
				.select(qNotice)
				.from(qNotice)
				.where(
						qNotice.school.eq(userDepartment.getSchool()),
						qNotice.noticeCode.eq(Code.K02),
						qNotice.gradeCode.eq(userDepartment.getGradeCode()),
						qNotice.delYn.isFalse()
						)
				.fetch();
		uuidAll.addAll(uuidByGrade);
		
		List<Notice> uuidByClass= jpaQueryFactory
				.select(qNotice)
				.from(qNotice)
				.where(
						qNotice.school.eq(userDepartment.getSchool()),
						qNotice.noticeCode.in(classCode),
						qNotice.gradeCode.eq(userDepartment.getGradeCode()),
						qNotice.classCode.eq(userDepartment.getClassCode()),
						qNotice.delYn.isFalse()
						)
				.fetch();
		uuidAll.addAll(uuidByClass);	   
		
		List<Notice> notices = jpaQueryFactory
				.select(qNotice)
				.from(qNotice)
				.where(
						qNotice.delYn.isFalse(),
						qNotice.school.eq(userDepartment.getSchool()),
						qNotice.in(uuidAll))
				.orderBy(qNotice.regTime.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
				.fetch();
		
		return new PageImpl<Notice>(notices, pageable, notices.size());
	}
	
	public long countByUser(User user) {
		
		UserDepartment userDepartment = jpaQueryFactory
				.select(qUserDepartment)
				.from(qUserDepartment)
				.where(
						qUserDepartment.user.eq(user),
						qUserDepartment.delYn.isFalse())
				.fetchOne();

		long count = 0L;
		
		count += jpaQueryFactory
				.selectFrom(qNotice)
				.where(
						qNotice.school.eq(userDepartment.getSchool()),
						qNotice.noticeCode.eq(Code.K01),
						qNotice.delYn.isFalse()
						)
				.fetchCount();
		
		count += jpaQueryFactory
				.selectFrom(qNotice)
				.where(
						qNotice.school.eq(userDepartment.getSchool()),
						qNotice.noticeCode.eq(Code.K02),
						qNotice.gradeCode.eq(userDepartment.getGradeCode()),
						qNotice.delYn.isFalse()
						)
				.fetchCount();
		List<Code> classCode = Arrays.asList(Code.K03, Code.K04, Code.K05);
		count +=  jpaQueryFactory
				.selectFrom(qNotice)
				.where(
						qNotice.school.eq(userDepartment.getSchool()),
						qNotice.noticeCode.in(classCode),
						qNotice.gradeCode.eq(userDepartment.getGradeCode()),
						qNotice.classCode.eq(userDepartment.getClassCode()),
						qNotice.delYn.isFalse()
						)
				.fetchCount();
		
		return count;
  	}

	@Override
	public Optional<Notice> findMeetingNotice(LocalDateTime regStartDate, LocalDateTime regEndDate, Code meetingCode, UserDepartment userDepartment) {
		
		Optional<Notice> notice = Optional.ofNullable(jpaQueryFactory
				.select(qNotice)
				.from(qNotice)
				.where(
						qNotice.regTime.between(regStartDate, regEndDate),
						qNotice.noticeCode.eq(meetingCode),
						qNotice.school.eq(userDepartment.getSchool()),
						qNotice.delYn.isFalse(),
						qNotice.gradeCode.eq(userDepartment.getGradeCode()),
						qNotice.classCode.eq(userDepartment.getClassCode())
						)
				.orderBy(qNotice.regTime.desc())
				.limit(1)
				.fetchOne());	
		
		return notice;
	}


}
