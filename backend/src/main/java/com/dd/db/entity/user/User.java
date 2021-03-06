package com.dd.db.entity.user;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.dd.db.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
	
	@Column(name="user_name")
	private String userName;
	
	@Column(name="user_email")
	private String userEmail;

	private String address;
	
	private String addressDetail;

	private String phone;
	
	@Column(name="parent_phone")
	private String parentPhone;
	
	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	// 프로필 수정 - [핸드폰 번호, 부모님 핸드폰 번호, 이메일, 주소, 상세주소] 수정
	public void update(String phone, String parentPhone, String userEmail, String address, String addressDetail) {
		this.phone = phone;
		this.parentPhone = parentPhone;
		this.userEmail = userEmail;
		this.address = address;
		this.addressDetail = addressDetail;
	}

	// 회원 탈퇴 - [회원 정보 삭제 여부] - 삭제 반영
	public void update(boolean delYn) {
		this.delYn = delYn;
	}

}