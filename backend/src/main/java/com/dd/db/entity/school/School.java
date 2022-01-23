package com.dd.db.entity.school;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.dd.db.enums.Code;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class School {
	
	@Enumerated(EnumType.STRING)
	private Code schoolCode;
	
	private String schoolName;
	
	private boolean delYn;
	
}
