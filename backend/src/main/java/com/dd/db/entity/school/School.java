package com.dd.db.entity.school;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;
import com.dd.db.enums.Code;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class School extends BaseEntity {
	
	@Enumerated(EnumType.STRING)
	private Code schoolCode;
	
	private String schoolName;
	
	private String schoolSerialNo;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
}
