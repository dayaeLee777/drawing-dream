package com.dd.db.entity.onlineclass;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OnlineClass extends BaseEntity {

	private LocalDateTime startTime;

	private LocalDateTime endTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "course_id")
	private Course course;

	@Column(name = "del_yn", columnDefinition = "BOOLEAN DEFAULT false")
	private boolean delYn;

	public void update(boolean delYn) {
		this.delYn = delYn;
	}

}
