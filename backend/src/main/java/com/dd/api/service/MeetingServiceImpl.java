package com.dd.api.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.dd.api.dto.request.MeetingRequestDto;
import com.dd.api.dto.response.MeetingResponseDto;
import com.dd.db.entity.board.Notice;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.repository.NoticeRepository;
import com.dd.db.repository.UserDepartmentRepository;

import lombok.RequiredArgsConstructor;

@Service("meetingService")
@RequiredArgsConstructor
public class MeetingServiceImpl implements MeetingService {

	private final NoticeRepository noticeRepository;
	
	private final UserDepartmentRepository userDepartmentRepository;
	
	private final JwtTokenService jwtTokenService;
	
	@Transactional
	@Override
	public MeetingResponseDto getMeeting(String accessToken, MeetingRequestDto meetingRequestDto) {
		User user = jwtTokenService.convertTokenToUser(accessToken);
		
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).orElse(null);
		
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		
		LocalDateTime regStartDate = meetingRequestDto.getDate().atTime(0, 0, 0);
		LocalDateTime regEndDate = meetingRequestDto.getDate().atTime(23, 59, 59);
		
		Notice notice = noticeRepository
				.findMeetingNotice(regStartDate, regEndDate, meetingRequestDto.getMeetingCode(), userDepartment).orElse(null);

		MeetingResponseDto meetingResponseDto;
		
		if(notice == null) {
			 meetingResponseDto = MeetingResponseDto.builder()
					.title(null)
					.content(null)
					.regDate(null)
					.build();
		}
		else {
			meetingResponseDto = MeetingResponseDto.builder()
					.noticeId(notice.getId())
					.title(notice.getTitle())
					.content(notice.getContent())
					.regDate(notice.getRegTime().format(dateTimeFormatter))
					.build();
		}
		return meetingResponseDto;
	}

}
