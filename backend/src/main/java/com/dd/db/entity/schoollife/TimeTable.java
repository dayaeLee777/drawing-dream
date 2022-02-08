package com.dd.db.entity.schoollife;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.onlineclass.Course;
import com.dd.db.entity.user.User;
import com.dd.db.enums.Code;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TimeTable extends BaseEntity {

	// 요일 코드
	@Enumerated(EnumType.STRING)
	private Code dayCode;

	// 교시 코드
	@Enumerated(EnumType.STRING)
	private Code periodCode;

	// 학기 코드
	@Enumerated(EnumType.STRING)
	private Code semesterCode;

	private boolean delYn;

	// 학생 정보
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	// 강의 정보
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "course_id")
	private Course course;

	public void update(Code dayCode, Code periodCode, Code semesterCode, Course course) {
		this.dayCode = dayCode;
		this.periodCode = periodCode;
		this.semesterCode = semesterCode;
		this.course = course;
	}

	public void update(boolean delYn) {
		this.delYn = delYn;
	}

}
