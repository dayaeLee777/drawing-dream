package com.dd.db.enums;

// 대분류 코드
public enum CommonCode {
	
	A("회원"),
	B("재적 상태"),
	C("출결"),
	D("학교"),
	E("학년"),
	F("반"),
	G("교과"),
	H("요일"),
	I("교시"),
	J("학사일정"),
	K("공지사항"),
	L("커뮤니티"),
	M("위젯"),
	N("승인");
	
	private String name;

	private CommonCode(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}
}