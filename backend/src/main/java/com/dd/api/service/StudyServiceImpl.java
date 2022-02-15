package com.dd.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.StudyRequestDTO;
import com.dd.api.dto.response.StudyGetListResponseDTO;
import com.dd.api.dto.response.StudyGetListWrapperResponseDTO;
import com.dd.api.dto.response.StudyResponseDTO;
import com.dd.db.entity.school.Study;
import com.dd.db.entity.user.User;
import com.dd.db.repository.StudyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudyServiceImpl implements StudyService {

	private final StudyRepository studyRepository;

	private final JwtTokenService jwtTokenService;

	@Transactional
	@Override
	public StudyResponseDTO createStudy(StudyRequestDTO studyRequestDTO, String accessToken) {

		User user = jwtTokenService.convertTokenToUser(accessToken);

		Study study = studyRepository.save(Study.builder().studyName(studyRequestDTO.getStudyName()).user(user)
				.regTime(LocalDateTime.now()).build());

		return StudyResponseDTO.builder().studyId(study.getId()).studyName(study.getStudyName())
				.hostId(study.getUser().getId()).hostName(study.getUser().getUserName()).regTime(study.getRegTime())
				.build();

	}

	@Transactional
	@Override
	public StudyResponseDTO getStudy(UUID studyId) {

		Study study = studyRepository.findByIdAndDelYn(studyId, false).orElse(null);

		if (study == null)
			return null;

		return StudyResponseDTO.builder().studyId(study.getId()).studyName(study.getStudyName())
				.hostId(study.getUser().getId()).hostName(study.getUser().getUserName()).regTime(study.getRegTime())
				.build();

	}

	@Transactional
	@Override
	public int deleteStudy(UUID studyId, String accessToken) {

		User user = jwtTokenService.convertTokenToUser(accessToken);

		Study study = studyRepository.findById(studyId).get();

		if (study.getUser().equals(user))
			study.update(true);

		return study.isDelYn() ? 1 : 0;

	}

	@Transactional
	@Override
	public StudyGetListWrapperResponseDTO getStudyList() {

		List<Study> studies = studyRepository.findByDelYnOrderByRegTimeDesc(false).orElse(null);

		List<StudyGetListResponseDTO> studyList = new ArrayList<>();

		studies.forEach(study -> {
			studyList.add(StudyGetListResponseDTO.builder().studyId(study.getId()).studyName(study.getStudyName())
					.hostId(study.getUser().getId()).hostName(study.getUser().getUserName()).regTime(study.getRegTime())
					.build());
		});

		return StudyGetListWrapperResponseDTO.builder().studyGetListResponseDTOs(studyList).build();

	}

}
