package com.dd.db.entity.user;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.enums.Code;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;

}
