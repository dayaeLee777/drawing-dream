package com.dd.api.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dd.api.dto.request.NoticeRegisterRequestDto;
import com.dd.api.dto.response.NoticeGetListResponseDto;
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
//		public int registerNotice(String accessToken, MultipartFile multipartFile, NoticeRegisterRequestDto noticeRegisterRequestDto) {
//		public int registerNotice(String accessToken, NoticeRegisterRequestDto noticeRegisterRequestDto) {
		User user = jwtTokenService.convertTokenToUser(accessToken);
		LocalDateTime currentDateTime = LocalDateTime.now();
		
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).orElse(null);
		if(userDepartment == null)
			return 401;
		if(userDepartment.getUserCode() == Code.A04)
			return 408;
		
		Code noticeCode = noticeRegisterRequestDto.getNoticeCode();
		
		Notice notice = Notice.builder()
				.title(noticeRegisterRequestDto.getTitle())
				.content(noticeRegisterRequestDto.getContent())
				.hit(0)
				.regTime(currentDateTime)
				.noticeCode(noticeCode)
				.school(userDepartment.getSchool())
				.user(user)
				.build();
		
		Code gradeCode = userDepartment.getGradeCode();
		Code classCode = userDepartment.getClassCode();
		
		if(noticeRegisterRequestDto.getNoticeCode() == Code.K02)
			notice.noticeByGrade(gradeCode);
		else if(noticeRegisterRequestDto.getNoticeCode() == Code.K03)
			notice.noticeByClass(classCode, gradeCode);
		System.out.println(noticeRegisterRequestDto);
		noticeRepository.save(notice);

//		awsS3Service.uploadFile(user, notice, noticeRegisterRequestDto.getMultipartFile());
		awsS3Service.uploadFile(user, notice, multipartFile);
		
		return 200;
	}

	@Transactional
	@Override
	public Notice deleteNotice(UUID noticeId) {
		Notice notice = noticeRepository.findById(noticeId).orElse(null);
		if(notice == null)
			return null;
		
		notice.deleteNotice();
//		awsS3Service.deleteNoticeFile(notice);
		return noticeRepository.save(notice);
	}

	@Override
	public List<NoticeGetListResponseDto> getNoticeList(String accessToken, Pageable pageable) {
		User user = jwtTokenService.convertTokenToUser(accessToken);
		Page<Notice> noticeList = noticeRepository.findByUserinfo(user, pageable);
		List<NoticeGetListResponseDto> noticeResponseList = new ArrayList<NoticeGetListResponseDto>();
		
		noticeList.forEach(notice -> {
			
			String noticeCodeString = "";
			
			if(notice.getNoticeCode() == Code.K01) 
				noticeCodeString = "전체";
			else if(notice.getNoticeCode() == Code.K02) {
				String gradeString = notice.getGradeCode().getName();
				noticeCodeString = gradeString;
				}
			else if(notice.getNoticeCode() == Code.K03) {
				String gradeString = notice.getGradeCode().getName();
				String classString = notice.getClassCode().getName();
				noticeCodeString = gradeString.concat(" ").concat(classString);
			}
			DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			
			NoticeGetListResponseDto noticeGetListResponseDto = NoticeGetListResponseDto.builder()
					.noticeId(notice.getId())
					.userName(notice.getUser().getUserName())
					.title(notice.getTitle())
					.noticeCode(notice.getNoticeCode())
					.noticeCodeString(noticeCodeString)
					.hit(notice.getHit())
					.regTime(notice.getRegTime().format(dateTimeFormatter))
					.build();
			
			noticeResponseList.add(noticeGetListResponseDto);
		});
		return noticeResponseList;
	}
	

}
