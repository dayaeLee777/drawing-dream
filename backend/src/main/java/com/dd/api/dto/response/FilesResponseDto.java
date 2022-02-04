package com.dd.api.dto.response;

import org.springframework.http.HttpHeaders;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel("FilesResponseDto")
public class FilesResponseDto {
	byte[] bytes;
	HttpHeaders httpHeaders;
}
