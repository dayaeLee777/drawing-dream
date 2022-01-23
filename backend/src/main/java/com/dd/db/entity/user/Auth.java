package com.dd.db.entity.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dd.db.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Auth extends BaseEntity{
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
	@JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	
	@Column(unique = true, name = "login_id", nullable = false)
	private String loginId;

	@Column(name="del_yn")
	private boolean delYn;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isDelYn() {
		return delYn;
	}

	public void setDelYn(boolean delYn) {
		this.delYn = delYn;
	}

	public String getLoginId() {
		return loginId;
	}

	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	@Override
	public String toString() {
		return "Auth [user=" + user + ", password=" + password + ", loginId=" + loginId + ", delYn=" + delYn + "]";
	}
	
	
}
