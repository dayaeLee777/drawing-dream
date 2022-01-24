package com.dd.db.entity.addon;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.user.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Memo extends BaseEntity {
	
	@Lob
	private String content;
	
	@Temporal(TemporalType.TIME)
	private Date regTime;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	
}
