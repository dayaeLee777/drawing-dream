package com.dd.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.dd.api.dto.response.PeriodGetResponseDto;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.repository.PeriodRepository;
import com.dd.db.repository.UserDepartmentRepository;

import lombok.RequiredArgsConstructor;

@Service("periodService")
@RequiredArgsConstructor
public class PeriodServiceImpl implements PeriodService {

	private final PeriodRepository periodRepository;

	private final UserDepartmentRepository userDepartmentRepository;

	private final JwtTokenService jwtTokenService;

	@Override
	public List<PeriodGetResponseDto> getPeriodList(String accessToken) {
		
		User user = jwtTokenService.convertTokenToUser(accessToken);
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).orElse(null);
		
		if (userDepartment == null)
			return null;
		
		List<PeriodGetResponseDto> periodList = new ArrayList<PeriodGetResponseDto>();
		
		periodRepository.findBySchoolOrderByPeriodCode(userDepartment.getSchool()).forEach(period -> {
			
			PeriodGetResponseDto periodGetResponseDto = PeriodGetResponseDto.builder()
					.periodCode(period.getPeriodCode())
					.startTime(period.getStartTime())
					.endTime(period.getEndTime())
					.build();
			
			periodList.add(periodGetResponseDto);
			
		});
		
		return periodList;
	}

}
