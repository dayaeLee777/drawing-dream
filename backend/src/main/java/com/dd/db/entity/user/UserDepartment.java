package com.dd.db.entity.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.school.School;
import com.dd.db.enums.Code;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class UserDepartment extends BaseEntity {
	
	@Enumerated(EnumType.STRING)
	private Code gradeCode;
	
	@Enumerated(EnumType.STRING)
	private Code classCode;
	
	@Column(name="student_no")
	private Integer studentNo;
	
	@Enumerated(EnumType.STRING)
	private Code stateCode;
	
	@Enumerated(EnumType.STRING)
	private Code userCode;
	
	@Enumerated(EnumType.STRING)
	private Code approvalCode;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="school_id")
	private School school;

}