package com.dd.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dd.api.service.AwsS3Service;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "파일 API", tags = { "File" })
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/file")
public class FileController {
	
	private final AwsS3Service awsS3Service;
	
	@PostMapping
	@ApiOperation(value = "Amazon S3에 파일 업로드", notes="Amazon S3에 파일 업로드")
	@ApiResponses({
		@ApiResponse(code=201, message="파일이 정상적으로 등록되었습니다."),
		@ApiResponse(code=401, message="인증되지 않은 사용자입니다."),
		@ApiResponse(code=409, message="업로드를 실패했습니다.")
	})
	public ResponseEntity<List<String>> upload(
		@ApiIgnore @RequestHeader("Authorization") String accessToken, 
//			UUID userId,
			@ApiParam(value="파일들(여러 파일 업로드 가능)", required = true) @RequestPart List<MultipartFile> multipartFile) {
		return ResponseEntity.status(200).body(awsS3Service.uploadFile(accessToken, multipartFile));
	}
}
