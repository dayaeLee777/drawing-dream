package com.dd.db.entity.files;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.board.Notice;
import com.dd.db.entity.user.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class NoticeFile extends BaseEntity {
	
	private String originFileName;
	
	private String newFileName;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "notice_id")
	private Notice notice;

	@Builder
	public NoticeFile(String originFileName, String newFileName, User user, Notice notice) {
		super();
		this.originFileName = originFileName;
		this.newFileName = newFileName;
		this.user = user;
		this.notice = notice;
	}
	
	public void updateImg(String originFileName, String newFileName) {
		this.originFileName = originFileName;
		this.newFileName = newFileName;
	}
}
