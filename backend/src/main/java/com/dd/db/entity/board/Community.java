package com.dd.db.entity.board;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Community extends BaseEntity {

	private int communityNo;
	
	private String title;
	
	@Lob
	private String content;
	
	@Column(name="hit", columnDefinition="INT DEFAULT 0")
	private int hit;
	
	private LocalDateTime regTime;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "school_id")
	private School school;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
}
