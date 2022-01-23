package com.dd.db.entity.schoollife;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.dd.db.entity.user.User;
import com.dd.db.enums.Code;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Attendance {
	
	@Temporal(TemporalType.DATE)
	private Date date;
	
	@Enumerated(EnumType.STRING)
	private Code attendanceCode;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
}
