package com.dd.api.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dd.api.dto.response.FilesResponseDto;

public interface AwsS3Service {
	
	List<String> uploadFile(String accessToken, List<MultipartFile> multipartFile, String db);
	void deleteFile(String accessToken, String fileName);
	String createFileName(String fileName);
	String getFileExtension(String fileName); 
	FilesResponseDto getObject(String storedFileName) throws IOException;
	public String getThumbnailPath(String path);
}
