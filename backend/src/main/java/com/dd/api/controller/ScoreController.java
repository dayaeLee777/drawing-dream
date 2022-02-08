package com.dd.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dd.api.dto.response.ScoreGetWrapperResponseDto;
import com.dd.api.service.ScoreService;
import com.dd.common.model.BaseResponseDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@CrossOrigin("*")
@Api(value="Score API", tags = { "Score" })
@RequiredArgsConstructor
@RequestMapping("/api/score")
public class ScoreController {
	
	private final ScoreService scoreService;
	
	@GetMapping()
	@ApiOperation(value="성적 리스트 가져오기")
	public ResponseEntity<? extends BaseResponseDto> getScoreList(
			@ApiIgnore @RequestHeader("Authorization") String accessToken) {
		ScoreGetWrapperResponseDto scoreGetWrapperResponseDto = scoreService.getScoreList(accessToken);
		
		if(scoreGetWrapperResponseDto == null)
			return ResponseEntity.status(401).body(BaseResponseDto.of(401, "인증되지 않은 사용자입니다."));
		
		return ResponseEntity.status(200).body(ScoreGetWrapperResponseDto.of(200, "성적 리스트를 정상적으로 불러왔습니다", scoreGetWrapperResponseDto));
	}
}
