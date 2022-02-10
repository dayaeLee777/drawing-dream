package com.dd.api.service;

import com.dd.api.dto.request.MeetingRequestDto;
import com.dd.api.dto.response.MeetingResponseDto;

public interface MeetingService {
	
	MeetingResponseDto getMeeting(String accessToken, MeetingRequestDto meetingRequestDto);

}
