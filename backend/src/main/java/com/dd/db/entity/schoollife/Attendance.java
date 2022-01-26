package com.dd.db.entity.schoollife;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.user.User;
import com.dd.db.enums.Code;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@Entity
@ToString
public class Attendance extends BaseEntity {
	
	private LocalDate date;
	
	@Enumerated(EnumType.STRING)
	private Code attendanceCode;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;
	
	public void updateAttendance(LocalDate date, Code attendanceCode) {
		this.date = date;
		this.attendanceCode = attendanceCode;
	}
	
	public void deleteAttendance() {
		this.delYn = true;
	}

	@Builder
	public Attendance(LocalDate date, Code attendanceCode, boolean delYn, User user) {
		super();
		this.date = date;
		this.attendanceCode = attendanceCode;
		this.delYn = delYn;
		this.user = user;
	}
	
	
}

