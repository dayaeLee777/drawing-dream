package com.dd.api.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dd.api.dto.response.CourseResponseDTO;
import com.dd.db.entity.onlineclass.Course;
import com.dd.db.entity.onlineclass.OnlineClass;
import com.dd.db.entity.user.User;
import com.dd.db.repository.CourseRepository;
import com.dd.db.repository.OnlineClassRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

	private final CourseRepository courseRepository;

	private final OnlineClassRepository onlineClassRepository;

	private final JwtTokenService jwtTokenService;

	@Override
	public CourseResponseDTO getCourse(UUID courseId, String accessToken) {

		User user = jwtTokenService.convertTokenToUser(accessToken);

		if (user == null)
			return null;

		Course course = courseRepository.findById(courseId).get();

		if (course == null)
			return null;

		OnlineClass onlineClass = onlineClassRepository.findByCourseId(courseId).get();

		return CourseResponseDTO.builder().courseId(courseId).name(course.getSubjectCode().getName())
				.onlineClassId(onlineClass.getId()).build();

	}

}
