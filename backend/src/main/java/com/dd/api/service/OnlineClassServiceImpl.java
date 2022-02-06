package com.dd.api.service;

import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.OnlineClassRegisterRequestDTO;
import com.dd.api.dto.response.OnlineClassResponseDTO;
import com.dd.db.entity.onlineclass.Course;
import com.dd.db.entity.onlineclass.OnlineClass;
import com.dd.db.entity.user.User;
import com.dd.db.repository.CourseRepository;
import com.dd.db.repository.OnlineClassRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OnlineClassServiceImpl implements OnlineClassService {

	private final CourseRepository courseRepository;

	private final OnlineClassRepository onlineClassRepository;

	private final JwtTokenService jwtTokenService;

	@Transactional
	@Override
	public OnlineClassResponseDTO createClass(OnlineClassRegisterRequestDTO onlineClassRegisterRequestDTO,
			String accessToken) {

		User user = jwtTokenService.convertTokenToUser(accessToken);

		if (user == null)
			return null;

		Course course = courseRepository.findById(onlineClassRegisterRequestDTO.getCourseId()).get();

		OnlineClass onlineClass = onlineClassRepository.save(OnlineClass.builder().course(course).build());

		return OnlineClassResponseDTO.builder().classId(onlineClass.getId()).build();

	}

	@Transactional
	@Override
	public int deleteClass(UUID classId, String accessToken) {

		if (jwtTokenService.convertTokenToUser(accessToken) == null)
			return 0;

		onlineClassRepository.deleteById(classId);

		return 1;
	}

}
