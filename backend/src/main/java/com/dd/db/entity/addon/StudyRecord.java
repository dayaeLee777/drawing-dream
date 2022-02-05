package com.dd.db.entity.addon;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@Entity
public class StudyRecord extends BaseEntity {

	private LocalDate studyDate;
	
	private String title;
	
	private LocalDateTime startTime;

	private LocalDateTime endTime;

	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@Builder
	public StudyRecord(LocalDate studyDate, String title, LocalDateTime startTime, LocalDateTime endTime, boolean delYn,
			User user) {
		super();
		this.studyDate = studyDate;
		this.title = title;
		this.startTime = startTime;
		this.endTime = endTime;
		this.delYn = delYn;
		this.user = user;
	}
	
	public void finishStudyRecord(LocalDateTime endTime) {
		this.endTime = endTime;
	}
	
	public void deleteStudyRecord() {
		this.delYn = true;
	}
	
}
