package com.dd.db.entity.onlineclass;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;
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
public class OnlineClass extends BaseEntity {

	@Temporal(TemporalType.TIME)
	private Date startTime;

	@Temporal(TemporalType.TIME)
	private Date endTime;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "course_id")
	private Course course;
}
