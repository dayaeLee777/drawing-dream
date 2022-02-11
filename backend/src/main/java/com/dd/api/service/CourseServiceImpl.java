package com.dd.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dd.api.dto.response.CourseGetListResponseDTO;
import com.dd.api.dto.response.CourseGetListWrapperResponseDTO;
import com.dd.api.dto.response.CourseResponseDTO;
import com.dd.db.entity.onlineclass.Course;
import com.dd.db.entity.onlineclass.OnlineClass;
import com.dd.db.repository.CourseRepository;
import com.dd.db.repository.OnlineClassRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

	private final CourseRepository courseRepository;

	private final OnlineClassRepository onlineClassRepository;

	@Override
	public CourseResponseDTO getCourse(UUID courseId) {

		Course course = courseRepository.findById(courseId).get();

		if (course == null)
			return null;

		OnlineClass onlineClass = onlineClassRepository.findByCourseIdAndDelYn(courseId, false).orElse(null);

		if (onlineClass == null) return CourseResponseDTO.builder()
														.courseId(courseId)
														.subjectCode(course.getSubjectCode())
														.teacherName(course.getTeacher().getUserName())
														.build();

		return CourseResponseDTO.builder()
								.courseId(courseId)
								.subjectCode(course.getSubjectCode())
								.teacherName(course.getTeacher().getUserName())
								.onlineClassId(onlineClass.getId())
								.build();

	}

	@Override
	public CourseGetListWrapperResponseDTO getCourseList() {

		List<CourseGetListResponseDTO> courseGetListResponseDTOs = new ArrayList<>();

		courseRepository.findAll().forEach(course -> {
			CourseGetListResponseDTO courseGetListResponseDTO = CourseGetListResponseDTO.builder()
																						.courseId(course.getId())
																						.subjectCode(course.getSubjectCode())
																						.teacherName(course.getTeacher().getUserName())
																						.build();

			courseGetListResponseDTOs.add(courseGetListResponseDTO);
		});

		return CourseGetListWrapperResponseDTO.builder()
											.courseGetListResponseDTOs(courseGetListResponseDTOs)
											.build();
	}

}
