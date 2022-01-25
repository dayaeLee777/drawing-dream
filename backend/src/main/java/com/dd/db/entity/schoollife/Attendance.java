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

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;
import com.dd.db.enums.Code;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Attendance extends BaseEntity {
	
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
