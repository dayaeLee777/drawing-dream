package com.dd.security.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.dd.db.entity.user.Auth;

public class UserDetailsImpl implements UserDetails {

	@Autowired
	Auth auth;

	List<GrantedAuthority> roles = new ArrayList<>();

	public UserDetailsImpl(Auth auth) {
		super();
		this.auth = auth;
	}

	public Auth getAuth() {
		return this.auth;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles;
	}

	@Override
	public String getPassword() {
		return this.auth.getPassword();
	}

	@Override
	public String getUsername() {
		return this.auth.getLoginId();
	}

	@Override
	public boolean isAccountNonExpired() {
		return !this.auth.isDelYn();
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return !this.auth.isDelYn();
	}

}
