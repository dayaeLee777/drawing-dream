package com.dd.api.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.dd.db.entity.board.Notice;
import com.dd.db.entity.files.NoticeFile;
import com.dd.db.entity.files.OnlineClassFile;
import com.dd.db.entity.files.ProfileImg;
import com.dd.db.entity.onlineclass.OnlineClass;
import com.dd.db.entity.user.User;
import com.dd.db.repository.NoticeFileRepository;
import com.dd.db.repository.OnlineClassFileRepository;
import com.dd.db.repository.ProfileImgRepository;

import lombok.RequiredArgsConstructor;

@Service("awsS3Service")
@RequiredArgsConstructor
public class AwsS3ServiceImpl implements AwsS3Service {

	@Value("${cloud.aws.s3.bucket}")
    private String bucket;
    
    private final AmazonS3Client amazonS3Client;
	
	private final ProfileImgRepository profileImgRepository;

	private final NoticeFileRepository noticeFileRepository;
	
	private final OnlineClassFileRepository onlineClassFileRepository;

	private final JwtTokenService jwtTokenService;
	
	@Transactional
	@Override
	public List<String> uploadFile(User user, Notice notice, List<MultipartFile> multipartFile) {
		
		List<String> fileNameList = new ArrayList<>();
		
		multipartFile.forEach(file -> {
	            String fileName = createFileName(file.getOriginalFilename());
	            ObjectMetadata objectMetadata = new ObjectMetadata();
	            objectMetadata.setContentLength(file.getSize());
	            objectMetadata.setContentType(file.getContentType());

	            try(InputStream inputStream = file.getInputStream()) {
	            	amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
	                        .withCannedAcl(CannedAccessControlList.PublicRead));
	            } catch(IOException e) {
	                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
	            }
	            
	            NoticeFile noticefile = NoticeFile.builder()
	            		.newFileName(fileName)
	            		.originFileName(file.getOriginalFilename())
	            		.user(user)
	            		.notice(notice)
	            		.build();

	            noticeFileRepository.save(noticefile);

	            fileNameList.add(fileName);
	        });
		return fileNameList;
	}
	
	@Transactional
	@Override
	public List<String> uploadFile(User user, OnlineClass onlineClass, List<MultipartFile> multipartFile) {
		
		List<String> fileNameList = new ArrayList<>();
		
		multipartFile.forEach(file -> {
	            String fileName = createFileName(file.getOriginalFilename());
	            ObjectMetadata objectMetadata = new ObjectMetadata();
	            objectMetadata.setContentLength(file.getSize());
	            objectMetadata.setContentType(file.getContentType());

	            try(InputStream inputStream = file.getInputStream()) {
	            	amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
	                        .withCannedAcl(CannedAccessControlList.PublicRead));
	            } catch(IOException e) {
	                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
	            }
	            
	            OnlineClassFile onlineClassFile = OnlineClassFile.builder()
	            		.newFileName(fileName)
	            		.originFileName(file.getOriginalFilename())
	            		.user(user)
	            		.onlineClass(onlineClass)
	            		.build();

	            onlineClassFileRepository.save(onlineClassFile);

	            fileNameList.add(fileName);
	        });
		
		return fileNameList;
	}
	
	
	@Transactional
	@Override
	public void deleteNoticeFile(Notice notice) {
		List<NoticeFile> noticeFiles = noticeFileRepository.findByNotice(notice);
		
		noticeFiles.forEach(noticeFile -> {
			noticeFileRepository.delete(noticeFile);
		});
	}

	@Transactional
	@Override
	public String uploadProfileImg(String accessToken, MultipartFile multipartFile) {
		User user = jwtTokenService.convertTokenToUser(accessToken);
		
        String fileName = createFileName(multipartFile.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        try(InputStream inputStream = multipartFile.getInputStream()) {
        	amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch(IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }
        
        ProfileImg profileImg = profileImgRepository.findByUser(user).orElse(null);
        if(profileImg == null) {
        	profileImg = ProfileImg.builder()
		    		.newFileName(fileName)
		    		.originFileName(multipartFile.getOriginalFilename())
		    		.user(user)
		    		.build();
        } else {
        	profileImg.updateImg(multipartFile.getOriginalFilename(), fileName);
        }
        profileImgRepository.save(profileImg);
        
		return fileName;
	}
	
	@Override
	public String createFileName(String fileName) {
		return UUID.randomUUID().toString().concat(getFileExtension(fileName));
	}
	
	@Override
	public String getFileExtension(String fileName) {
		try {
			return fileName.substring(fileName.lastIndexOf("."));
		} catch (StringIndexOutOfBoundsException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
		}
	}
	
	@Transactional
	@Override
	public String getThumbnailPath(User user) {
		ProfileImg profileImg = profileImgRepository.findByUser(user).orElse(null);
		if(profileImg == null)
			return null;
		else
			return amazonS3Client.getResourceUrl(bucket, profileImg.getNewFileName());
	}
	
	@Transactional
	@Override
	public String getFilePath(String newFileName) {
		return amazonS3Client.getResourceUrl(bucket, newFileName);
	}
	
}
