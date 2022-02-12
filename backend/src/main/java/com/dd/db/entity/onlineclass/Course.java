package com.dd.db.entity.onlineclass;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.dd.db.entity.user.User;
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
public class Course extends BaseEntity {

	@Enumerated(EnumType.STRING)
	private SubCode subjectCode;

	@Column(name = "del_yn", columnDefinition = "BOOLEAN DEFAULT false")
	private boolean delYn;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User teacher;
	
	@Column(name = "online_class_exists_yn", columnDefinition = "BOOLEAN DEFAULT false")
	private boolean onlineClassExistsYn;

	public void updateOnlineClass(boolean onlineClassExistsYn) {
		this.onlineClassExistsYn = onlineClassExistsYn;
	}
}
