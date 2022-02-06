package com.dd.api.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dd.api.dto.request.NoticeRegisterRequestDto;
import com.dd.db.entity.board.Notice;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.enums.Code;
import com.dd.db.repository.NoticeRepository;
import com.dd.db.repository.UserDepartmentRepository;

import lombok.RequiredArgsConstructor;

@Service("noticeService")
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

	private final NoticeRepository noticeRepository;
	
	private final JwtTokenService jwtTokenService;
	
	private final UserDepartmentRepository userDepartmentRepository;
	
	private final AwsS3Service awsS3Service;
	
	@Transactional
	@Override
	public int registerNotice(String accessToken, List<MultipartFile> multipartFile, NoticeRegisterRequestDto noticeRegisterRequestDto) {
		User user = jwtTokenService.convertTokenToUser(accessToken);
		LocalDateTime currentDateTime = LocalDateTime.now();
		
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).orElse(null);
		if(userDepartment == null)
			return 401;
		if(userDepartment.getUserCode() == Code.A04)
			return 408;
		
		Notice notice = Notice.builder()
				.title(noticeRegisterRequestDto.getTitle())
				.content(noticeRegisterRequestDto.getContent())
				.hit(0)
				.regTime(currentDateTime)
				.noticeCode(noticeRegisterRequestDto.getNoticeCode())
				.gradeCode(userDepartment.getGradeCode())
				.classCode(userDepartment.getClassCode())
				.school(userDepartment.getSchool())
				.user(user)
				.build();
		
		noticeRepository.save(notice);

		awsS3Service.uploadFile(user, notice, multipartFile);
		
		return 200;
	}

	@Override
	public Notice deleteNotice(UUID noticeId) {
		Notice notice = noticeRepository.findById(noticeId).orElse(null);
		if(notice == null)
			return null;
		
		notice.deleteNotice();
		awsS3Service.deleteFile(notice);
		return noticeRepository.save(notice);
	}
	

}
