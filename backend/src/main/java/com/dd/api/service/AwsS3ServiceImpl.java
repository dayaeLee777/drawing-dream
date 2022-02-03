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

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.dd.db.entity.files.Files;
import com.dd.db.entity.user.User;
import com.dd.db.repository.FileRepository;

import lombok.RequiredArgsConstructor;

@Service("awsS3Service")
@RequiredArgsConstructor
public class AwsS3ServiceImpl implements AwsS3Service {

	@Value("${cloud.aws.s3.bucket}")
    private String bucket;
	
    private final AmazonS3 amazonS3;
	
	private final FileRepository fileRepository;

	private final JwtTokenService jwtTokenService;
    
	@Transactional
	@Override
	public List<String> uploadFile(String accessToken, List<MultipartFile> multipartFile) {
		User user = jwtTokenService.convertTokenToUser(accessToken);
		List<String> fileNameList = new ArrayList<>();
		
		multipartFile.forEach(file -> {
	            String fileName = createFileName(file.getOriginalFilename());
	            ObjectMetadata objectMetadata = new ObjectMetadata();
	            objectMetadata.setContentLength(file.getSize());
	            objectMetadata.setContentType(file.getContentType());

	            try(InputStream inputStream = file.getInputStream()) {
	                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
	                        .withCannedAcl(CannedAccessControlList.PublicRead));
	            } catch(IOException e) {
	                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
	            }
	            
	            Files fileEntity = Files.builder()
	            		.newFileName(fileName)
	            		.originFileName(file.getOriginalFilename())
	            		.user(user)
	            		.build();
	            
	            fileRepository.save(fileEntity);

	            fileNameList.add(fileName);
	        });
		return fileNameList;
	}

	@Transactional
	@Override
	public void deleteFile(String accessToken, String fileName) {
		amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
		Files deleteFile = fileRepository.findByNewFileName(fileName).get();
		fileRepository.delete(deleteFile);
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

}
