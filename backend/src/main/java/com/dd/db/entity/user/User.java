package com.dd.db.entity.user;

import javax.persistence.Entity;

import com.dd.db.entity.BaseEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class User extends BaseEntity {

	private String userName;

	private String userEmail;

	private String address;

	private String phone;

	private String parentPhone;

	private boolean delYn;

}