package com.dd.api.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Service {
	
	List<String> uploadFile(String accessToken, List<MultipartFile> multipartFile);
//	List<String> uploadFile(List<MultipartFile> multipartFile);
	void deleteFile(String accessToken, String fileName);
	String createFileName(String fileName);
	String getFileExtension(String fileName); 
	
}
