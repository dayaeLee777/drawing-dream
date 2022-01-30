package com.dd.db.entity.school;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.enums.Code;
import com.dd.db.enums.SubCode;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Calendar extends BaseEntity {
	
	@Enumerated(EnumType.STRING)
	private Code calendarCode;
	
	@Enumerated(EnumType.STRING)
	private SubCode testCode;
	
	@Enumerated(EnumType.STRING)
	private Code semesterCode;
	
	private LocalDate startDate;
	
	private LocalDate endDate;
	
	@Enumerated(EnumType.STRING)
	private Code gradeCode;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="school_id")
	private School school;
	
}
