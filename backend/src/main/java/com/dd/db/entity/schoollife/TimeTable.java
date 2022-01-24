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

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class TimeTable extends BaseEntity {
	
	@Enumerated(EnumType.STRING)
	private Code dayCode;
	
	@Enumerated(EnumType.STRING)
	private Code periodCode;
	
	@Enumerated(EnumType.STRING)
	private Code semesterCode;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "course_id")
	private Course course;
}
