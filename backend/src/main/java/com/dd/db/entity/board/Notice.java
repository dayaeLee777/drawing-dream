package com.dd.db.entity.board;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.User;
import com.dd.db.enums.Code;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
@ToString
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Notice extends BaseEntity  implements Comparable<Notice>{
	
	private String title;
	
	@Lob
	private String content;
	
	private int hit;
	
	private LocalDateTime regTime;
	
	@Enumerated(EnumType.STRING)
	private Code noticeCode;
	
	@Enumerated(EnumType.STRING)
	private Code gradeCode;
	
	@Enumerated(EnumType.STRING)
	private Code classCode;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "school_id")
	private School school;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	
	public void deleteNotice() {
		this.delYn = true;
	}
	
	public void updateNotice(String title, String content, Code noticeCode) {
		this.title = title;
		this.content = content;
		this.noticeCode = noticeCode;
	}
	
	public void noticeByGrade(Code gradeCode) {
		this.gradeCode = gradeCode;
	}
	
	public void noticeByClass(Code classCode, Code gradeCode) {
		this.classCode = classCode;
		this.gradeCode = gradeCode;
	}

	@Override
	public int compareTo(Notice o) {
		return o.regTime.compareTo(this.regTime);
	}
}
