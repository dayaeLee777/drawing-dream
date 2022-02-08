package com.dd.db.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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
		
		List<Notice> noticeList = new ArrayList<Notice>();
		
		UserDepartment userDepartment = jpaQueryFactory
				.select(qUserDepartment)
				.from(qUserDepartment)
				.where(
						qUserDepartment.user.eq(user),
						qUserDepartment.delYn.isFalse())
				.fetchOne();
		
		List<Notice> noticeBySchool = jpaQueryFactory
				.select(qNotice)
				.from(qNotice)
				.where(
						qNotice.school.eq(userDepartment.getSchool()),
						qNotice.noticeCode.eq(Code.K01),
						qNotice.delYn.isFalse()
						)
				.fetch();
		noticeList.addAll(noticeBySchool);
		
		List<Notice> noticeByGrade = jpaQueryFactory
				.select(qNotice)
				.from(qNotice)
				.where(
						qNotice.school.eq(userDepartment.getSchool()),
						qNotice.noticeCode.eq(Code.K02),
						qNotice.gradeCode.eq(userDepartment.getGradeCode()),
						qNotice.delYn.isFalse()
						)
				.fetch();
		noticeList.addAll(noticeByGrade);
		
		List<Notice> noticeByClass = jpaQueryFactory
				.select(qNotice)
				.from(qNotice)
				.where(
						qNotice.school.eq(userDepartment.getSchool()),
						qNotice.noticeCode.eq(Code.K03),
						qNotice.gradeCode.eq(userDepartment.getGradeCode()),
						qNotice.classCode.eq(userDepartment.getClassCode()),
						qNotice.delYn.isFalse()
						)
				.fetch();
		
		noticeList.addAll(noticeByClass);
		Collections.sort(noticeList);
		return new PageImpl<Notice>(noticeList, pageable, noticeList.size());
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
		
		count +=  jpaQueryFactory
				.selectFrom(qNotice)
				.where(
						qNotice.school.eq(userDepartment.getSchool()),
						qNotice.noticeCode.eq(Code.K03),
						qNotice.gradeCode.eq(userDepartment.getGradeCode()),
						qNotice.classCode.eq(userDepartment.getClassCode()),
						qNotice.delYn.isFalse()
						)
				.fetchCount();
		
		return count;
  	}
}
