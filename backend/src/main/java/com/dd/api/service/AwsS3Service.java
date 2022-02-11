package com.dd.api.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dd.api.dto.response.FilesResponseDto;
import com.dd.db.entity.board.Notice;
import com.dd.db.entity.onlineclass.OnlineClass;
import com.dd.db.entity.user.User;

public interface AwsS3Service {
	
	List<String> uploadFile(String accessToken,  List<MultipartFile> multipartFile);
	List<String> uploadFile(User user, Notice notice, List<MultipartFile> multipartFile);
	String uploadFile(User user, Notice notice, MultipartFile multipartFile);
	String uploadProfileImg(String accessToken, MultipartFile multipartFile);
	void deleteNoticeFile(Notice notice);
	String createFileName(String fileName);
	String getFileExtension(String fileName); 
	FilesResponseDto getObject(String storedFileName) throws IOException;
	String getThumbnailPath(User user);
	String getFilePath(String newFileName);
	List<String> uploadFile(User user, OnlineClass onlineClass, List<MultipartFile> multipartFile);
}
