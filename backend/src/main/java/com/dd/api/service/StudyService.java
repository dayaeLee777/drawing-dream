package com.dd.api.service;

import java.util.UUID;

import com.dd.api.dto.request.StudyRequestDTO;
import com.dd.api.dto.response.StudyGetListWrapperResponseDTO;
import com.dd.api.dto.response.StudyResponseDTO;

public interface StudyService {

	StudyResponseDTO createStudy(StudyRequestDTO studyRequestDTO, String accessToken);

	StudyResponseDTO getStudy(UUID studyId);

	int deleteStudy(UUID studyId, String accessToken);

	StudyGetListWrapperResponseDTO getStudyList();

}
