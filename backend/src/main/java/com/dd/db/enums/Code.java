package com.dd.db.enums;

// 중분류 코드
public enum Code {
	
	A01("관리자",true),
	A02("학교 관리자",true),
	A03("선생님",true),
	A04("학생",true),
	B01("재학",true),
	B02("전학",true),
	B03("중퇴",true),
	B04("졸업",true),
	C01("미출석",true),
	C02("출석",true),
	C03("결석",true),
	C04("조퇴",true),
	D01("초등학교",true),
	D02("중학교",true),
	D03("고등학교",true),
	D04("대학교",true),
	E01("1학년",true),
	E02("2학년",true),
	E03("3학년",true),
	E04("4학년",true),
	E05("5학년",true),
	E06("6학년",true),
	F01("1반",true),
	F02("2반",true),
	F03("3반",true),
	F04("4반",true),
	F05("5반",true),
	F06("6반",true),
	F07("7반",true),
	F08("8반",true),
	F09("9반",true),
	F10("10반",true),
	F11("11반",true),
	F12("12반",true),
	F13("13반",true),
	F14("14반",true),
	F15("15반",true),
	G01("국어",true),
	G02("수학",true),
	G03("영어",true),
	G04("한국사",true),
	G05("통합사회",true),
	G06("통합과학",true),
	G07("체육",true),
	G08("예술",true),
	G09("기가",true),
	G10("제2외국어",true),
	G11("한문",true),
	G12("교양",true),
	H01("월요일",true),
	H02("화요일",true),
	H03("수요일",true),
	H04("목요일",true),
	H05("금요일",true),
	I00("출석 가능 시간",true),
	I01("1교시",true),
	I02("2교시",true),
	I03("3교시",true),
	I04("4교시",true),
	I05("5교시",true),
	I06("6교시",true),
	I07("7교시",true),
	I08("8교시",true),
	I09("9교시",true),
	J01("입학식",true),
	J02("졸업식",true),
	J03("방학식",true),
	J04("개학식",true),
	J05("개교기념일",true),
	J06("운동회",true),
	J07("수학여행",true),
	J08("수련회",true),
	J09("종업식",true),
	J10("시험",true),
	J11("기타",true),
	K01("전체",true),
	K02("학년",true),
	K03("반",true),
	L01("고민",false),
	L02("유머",false),
	L03("자유",false),
	L04("정보",false),
	L05("질문",false),
	L06("기타",false),
	M01("오늘의 수업",true),
	M02("학사일정",true),
	M03("체크리스트",true),
	M04("메모",true),
	M05("성적추이",true),
	M06("오늘의 공부시간",true),
	M07("시간표",true),
	N01("승인",true),
	N02("미승인",true);

	private String name;
	
	private boolean useYn;
	
	private Code(String name, boolean useYn) {
		this.name = name;
		this.useYn = useYn;
	}

	public String getName() {
		return name;
	}

	public boolean isUseYn() {
		return useYn;
	}
}
