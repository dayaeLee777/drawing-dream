package com.dd.db.entity.user;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.enums.Code;

@Entity
public class UserDepartment extends BaseEntity{
	
	@Enumerated(EnumType.STRING)
	private Code gradeCode;
	
	@Enumerated(EnumType.STRING)
	private Code classCode;
	
	@Enumerated(EnumType.STRING)
	private Code stateCode;
	
	@Enumerated(EnumType.STRING)
	private Code userCode;
	
	@Enumerated(EnumType.STRING)
	private Code approvalCode;
	
	private boolean delYn;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;

	// 학교 엔티티 생성 후 추가
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name="school_id")
//	private School school;
	
	
	public Code getGradeCode() {
		return gradeCode;
	}

	public void setGradeCode(Code gradeCode) {
		this.gradeCode = gradeCode;
	}

	public Code getClassCode() {
		return classCode;
	}

	public void setClassCode(Code classCode) {
		this.classCode = classCode;
	}

	public Code getStateCode() {
		return stateCode;
	}

	public void setStateCode(Code stateCode) {
		this.stateCode = stateCode;
	}

	public Code getUserCode() {
		return userCode;
	}

	public void setUserCode(Code userCode) {
		this.userCode = userCode;
	}

	public Code getApprovalCode() {
		return approvalCode;
	}

	public void setApprovalCode(Code approvalCode) {
		this.approvalCode = approvalCode;
	}

	public boolean isDelYn() {
		return delYn;
	}

	public void setDelYn(boolean delYn) {
		this.delYn = delYn;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
