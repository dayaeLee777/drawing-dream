package com.dd.security.util;

import java.util.Date;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.dd.security.service.UserDetailsServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

// JWT 토큰 생성, 토큰 복호화 및 정보 추출, 토큰 유효성 검증의 기능이 구현된 클래스
@Component
public class JwtAuthenticationProvider {

	@Value("${jwt.secret}")
	private String secretKey;

	@Value("${jwt.expiration}")
	private long tokenValidTime;

	private static final String AUTHORITIES_KEY = "auth";
	public static final String BEARER_PREFIX = "Bearer ";
	public static final String AUTHORIZATION_HEADER = "Authorization";
	public static final String TOKEN_ISSUER = "Drawing Dream";

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	// JWT 토큰 생성
	public String createToken(Authentication authentication) {
		System.out.println("createToken : 진입, name : " + authentication.getName());
		
		String authorities = authentication.getAuthorities().stream()
		          .map(GrantedAuthority::getAuthority)
		          .collect(Collectors.joining(","));
		
		Date now = new Date();

		return Jwts.builder()
				.setSubject(authentication.getName()) // 정보 저장
				.claim(AUTHORITIES_KEY, authorities)
				.setIssuer(TOKEN_ISSUER) // 토큰 발급자
				.setIssuedAt(now) // 토큰 발행 시간 정보
				.setExpiration(new Date(now.getTime() + tokenValidTime)) // 만료 시간
				.signWith(SignatureAlgorithm.HS512, secretKey) // 사용할 암호화 알고리즘과 signature 에 들어갈 secret 값 세팅
				.compact();
	}

	// JWT 토큰에서 인증 정보 조회
	public Authentication getAuthentication(String token) {
		System.out.println("getAuthentication : 진입");

		UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUsername(token));

		System.out.println("userDetails : " + userDetails);
		System.out.println("userDetails.getAuth : " + userDetails.getAuthorities());

		// JWT 토큰 서명을 통해 서명이 정상이라면 Authorites 객체 생성
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}

	// 토큰에서 회원 정보 추출
	public String getUsername(String token) {
		System.out.println("getUsername : 진입");

		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
	}

	// Request 의 Header 에서 토큰 값 가져옴
	public String resolveToken(HttpServletRequest request) {
		System.out.println("resolveToken : 진입");

		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
		System.out.println("bearerToken : " + bearerToken);

		if (bearerToken != null && bearerToken.startsWith(BEARER_PREFIX)) {
			return bearerToken.substring(7);
		} else {
			return "No JWT found in request headers";
		}
	}

	// 토큰의 유효성 + 만료일자 확인
	public boolean validateToken(String token) {
		System.out.println("validateToken : 진입");

		try {
			Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);

			return true;
		} catch (SignatureException e) {
			System.out.println("Invalid JWT signature : " + e.getMessage());
		} catch (MalformedJwtException e) {
			System.out.println("Invalid JWT token : " + e.getMessage());
		} catch (ExpiredJwtException e) {
			System.out.println("JWT is expired : " + e.getMessage());
		} catch (UnsupportedJwtException e) {
			System.out.println("JWT is unsupported : " + e.getMessage());
		} catch (IllegalArgumentException e) {
			System.out.println("JWT claims string is empty : " + e.getMessage());
		}
		
		return false;
	}

}
