package com.dd.db.entity.school;

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

import com.dd.db.enums.Code;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Period {

	@Enumerated(EnumType.STRING)
	private Code periodCode;

	@Temporal(TemporalType.TIME)
	private Date startTime;

	@Temporal(TemporalType.TIME)
	private Date endTime;

	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "school_id")
	private School school;
	
}
