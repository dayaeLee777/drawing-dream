package com.dd.api.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dd.api.dto.request.OnlineClassRegisterRequestDTO;
import com.dd.api.dto.response.OnlineClassInfoGetResponseDto;
import com.dd.api.dto.response.OnlineClassResponseDTO;
import com.dd.db.entity.onlineclass.Course;
import com.dd.db.entity.onlineclass.OnlineClass;
import com.dd.db.entity.user.User;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.CourseRepository;
import com.dd.db.repository.OnlineClassFileRepository;
import com.dd.db.repository.OnlineClassRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OnlineClassServiceImpl implements OnlineClassService {

	private final AuthRepository authRepository;
	
	private final CourseRepository courseRepository;

	private final OnlineClassRepository onlineClassRepository;
	
	private final OnlineClassFileRepository onlineClassFileRepository;
	
	private final JwtAuthenticationProvider jwtAuthenticationProvider;
	
	private final AwsS3Service awsS3Service;

	@Transactional
	@Override
	public OnlineClassResponseDTO createClass(List<MultipartFile> multipartFile, OnlineClassRegisterRequestDTO onlineClassRegisterRequestDTO,
			String accessToken) {
		
		String loginId = getLoginIdFromToken(accessToken);
		
		User user = authRepository.findByLoginId(loginId).get().getUser();

		Course course = courseRepository.findById(onlineClassRegisterRequestDTO.getCourseId()).get();

		OnlineClass onlineClass = onlineClassRepository.save(OnlineClass.builder().course(course).build());

		course.updateOnlineClass(true);
		
		courseRepository.save(course);
		
		if(multipartFile != null)
			awsS3Service.uploadFile(user, onlineClass, multipartFile);
		
		Map<String, String> files = new HashMap<String, String>();
		
		onlineClassFileRepository.findByOnlineClass(onlineClass).forEach(onlineClassFile -> {
			String fileUrl = awsS3Service.getFilePath(onlineClassFile.getNewFileName()); 
			files.put(onlineClassFile.getOriginFileName(), fileUrl);
		});
		
		return OnlineClassResponseDTO.builder().classId(onlineClass.getId()).files(files).build();

	}

	@Transactional
	@Override
	public int deleteClass(UUID courseId, String accessToken) {

		OnlineClass onlineClass = onlineClassRepository.findByCourseIdAndDelYn(courseId, false).get();
		onlineClass.update(true);

		return onlineClassRepository.findById(onlineClass.getId()).get().isDelYn() ? 1 : 0;

	}
	
	@Override
	public OnlineClassInfoGetResponseDto getOnlineClassInfo(String accessToken, UUID courseId) {
		String loginId = getLoginIdFromToken(accessToken);
		
		User user = authRepository.findByLoginId(loginId).get().getUser();
		
		if(user == null) return null;
		
		Course course = courseRepository.findById(courseId).get();
		
		OnlineClass onlineClass = onlineClassRepository.findByCourseIdAndDelYn(courseId, false).get();
		
		if(onlineClass == null) return null;
		
		Map<String, String> files = new HashMap<String, String>();
		
		onlineClassFileRepository.findByOnlineClass(onlineClass).forEach(onlineClassFile -> {
			String fileUrl = awsS3Service.getFilePath(onlineClassFile.getNewFileName()); 
			files.put(onlineClassFile.getOriginFileName(), fileUrl);
		});
		
		OnlineClassInfoGetResponseDto onlineClassInfoGetResponseDto =
				OnlineClassInfoGetResponseDto.builder()
					.files(files)
					.isOnlineClassExists(course.isOnlineClassExistsYn())
					.build();
		
		return onlineClassInfoGetResponseDto;
	}
	
	@Override
	public String getLoginIdFromToken(String accessToken) {
		String token = accessToken.split(" ")[1];
		return jwtAuthenticationProvider.getUsername(token);
	}

}
