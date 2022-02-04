package com.dd.db.entity.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonProperty;

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
public class Auth extends BaseEntity{
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
//	@JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	
	@Column(unique = true, name = "login_id", nullable = false)
	private String loginId;

	@Column(name="del_yn", columnDefinition="BOOLEAN DEFAULT false")
	private boolean delYn;
	
	// 프로필 수정 - [비밀번호] 수정
	public void update(String password) {
		this.password = password;
	}
	
	// 회원 탈퇴 - [회원 인증 정보 삭제 여부] 반영
	public void update(boolean delYn) {
		this.delYn = delYn;
	}
}
