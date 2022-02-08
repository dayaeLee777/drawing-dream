package com.dd.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.TimeTableRegisterRequestDTO;
import com.dd.api.dto.request.TimeTableUpdateRequestDTO;
import com.dd.api.dto.response.TimeTableGetListResponseDTO;
import com.dd.api.dto.response.TimeTableGetListWrapperResponseDTO;
import com.dd.api.dto.response.TimeTableResponseDTO;
import com.dd.db.entity.schoollife.TimeTable;
import com.dd.db.entity.user.User;
import com.dd.db.repository.CourseRepository;
import com.dd.db.repository.TimeTableRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TimeTableServiceImpl implements TimeTableService {

	private final TimeTableRepository timeTableRepository;

	private final CourseRepository courseRepository;

	private final JwtTokenService jwtTokenService;

	@Transactional
	@Override
	public TimeTableGetListWrapperResponseDTO getAll() {

		List<TimeTableGetListResponseDTO> timeTableGetListResponseDTOs = new ArrayList<>();

		timeTableRepository.findBydelYnOrderByDayCodeAscPeriodCodeAsc(false).forEach(timeTable -> {
			TimeTableGetListResponseDTO timeTableGetListResponseDTO = TimeTableGetListResponseDTO.builder()
																								.timeTableId(timeTable.getId())
																								.dayCode(timeTable.getDayCode())
																								.periodCode(timeTable.getPeriodCode())
																								.semesterCode(timeTable.getSemesterCode())
																								.courseId(timeTable.getCourse().getId())
																								.courseCode(timeTable.getCourse().getSubjectCode())
																								.build();

			timeTableGetListResponseDTOs.add(timeTableGetListResponseDTO);
		});

		return TimeTableGetListWrapperResponseDTO.builder().timeTableGetListResponseDTOs(timeTableGetListResponseDTOs)
				.build();
	}

	@Transactional
	@Override
	public TimeTable register(String accessToken, TimeTableRegisterRequestDTO timeTableRegisterRequestDTO) {

		User user = jwtTokenService.convertTokenToUser(accessToken);

		TimeTable timeTable = TimeTable.builder()
									.dayCode(timeTableRegisterRequestDTO.getDayCode())
									.periodCode(timeTableRegisterRequestDTO.getPeriodCode())
									.semesterCode(timeTableRegisterRequestDTO.getSemesterCode())
									.user(user)
									.course(courseRepository.findById(timeTableRegisterRequestDTO.getCourseId()).get())
									.build();

		return timeTableRepository.save(timeTable);

	}

	@Transactional
	@Override
	public TimeTableResponseDTO get(UUID timeTableId) {

		TimeTable timeTable = timeTableRepository.findById(timeTableId).orElse(null);

		if (timeTable == null || timeTable.isDelYn())
			return null;

		return TimeTableResponseDTO.builder()
								.timeTableId(timeTable.getId())
								.dayCode(timeTable.getDayCode())
								.periodCode(timeTable.getPeriodCode())
								.semesterCode(timeTable.getSemesterCode())
								.courseId(timeTable.getCourse().getId())
								.courseCode(timeTable.getCourse().getSubjectCode())
								.build();

	}

	@Transactional
	@Override
	public TimeTable modify(String accessToken, TimeTableUpdateRequestDTO timeTableUpdateRequestDTO) {

		User user = jwtTokenService.convertTokenToUser(accessToken);

		TimeTable timeTable = timeTableRepository.findById(timeTableUpdateRequestDTO.getTimeTableId()).get();

		if (user != timeTable.getUser())
			return null;

		timeTable.update(timeTableUpdateRequestDTO.getDayCode(),
						timeTableUpdateRequestDTO.getPeriodCode(),
						timeTableUpdateRequestDTO.getSemesterCode(),
						courseRepository.findById(timeTableUpdateRequestDTO.getCourseId()).get());

		return timeTableRepository.save(timeTable);

	}

	@Transactional
	@Override
	public TimeTable delete(String accessToken, UUID timeTableId) {

		User user = jwtTokenService.convertTokenToUser(accessToken);

		TimeTable timeTable = timeTableRepository.findById(timeTableId).get();

		if (user != timeTable.getUser())
			return null;

		timeTable.update(true);

		return timeTableRepository.save(timeTable);

	}

}
