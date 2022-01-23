package com.dd.db.entity.board;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.dd.db.entity.school.School;
import com.dd.db.entity.user.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Community {

	private int communityNo;
	
	private String title;
	
	@Lob
	private String content;
	
	private int hit;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date regTime;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "school_id")
	private School school;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
}
