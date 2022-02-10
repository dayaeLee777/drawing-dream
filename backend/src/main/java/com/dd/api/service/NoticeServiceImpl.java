package com.dd.api.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dd.api.dto.request.NoticeRegisterRequestDto;
import com.dd.api.dto.request.NoticeUpdateRequestDto;
import com.dd.api.dto.response.NoticeGetListResponseDto;
import com.dd.api.dto.response.NoticeGetResponseDto;
import com.dd.api.dto.response.TotalNoticeGetResponseDto;
import com.dd.db.entity.board.Notice;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.enums.Code;
import com.dd.db.repository.NoticeFileRepository;
import com.dd.db.repository.NoticeRepository;
import com.dd.db.repository.UserDepartmentRepository;

import lombok.RequiredArgsConstructor;

@Service("noticeService")
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

	private final NoticeRepository noticeRepository;
	
	private final JwtTokenService jwtTokenService;
	
	private final UserDepartmentRepository userDepartmentRepository;
	
	private final NoticeFileRepository noticeFileRepository;
	
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
		else if(noticeRegisterRequestDto.getNoticeCode() == Code.K03 ||
				noticeRegisterRequestDto.getNoticeCode() == Code.K04 || 
				noticeRegisterRequestDto.getNoticeCode() == Code.K05)
			notice.noticeByClass(classCode, gradeCode);
		noticeRepository.save(notice);

		if(multipartFile != null)
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

	@Transactional
	@Override
	public List<NoticeGetListResponseDto> getNoticeList(String accessToken, int pageNumber) {
		
		User user = jwtTokenService.convertTokenToUser(accessToken);
		
		Page<Notice> noticeList = noticeRepository.findByUserinfoWithPaging(user, PageRequest.of(pageNumber, 10));
		List<NoticeGetListResponseDto> noticeResponseList = new ArrayList<NoticeGetListResponseDto>();
			
		noticeList.forEach(notice -> {
			
			String noticeCodeString = "";
			
			if(notice.getNoticeCode() == Code.K01) 
				noticeCodeString = "전체";
			else if(notice.getNoticeCode() == Code.K02) {
				String gradeString = notice.getGradeCode().getName();
				noticeCodeString = gradeString;
				}
			else if(notice.getNoticeCode() == Code.K03 ) {
				String gradeString = notice.getGradeCode().getName();
				String classString = notice.getClassCode().getName();
				noticeCodeString = gradeString.concat(" ").concat(classString);
			}
			else if(notice.getNoticeCode() == Code.K04 ) {
				noticeCodeString = Code.K04.getName();
			}
			else if(notice.getNoticeCode() == Code.K05 ) {
				noticeCodeString = Code.K05.getName();
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

	@Transactional
	@Override
	public NoticeGetResponseDto getNotice(UUID noticeId) {
		Notice notice = noticeRepository.findById(noticeId).orElse(null);
		if(notice == null)
			return null;
		
		User user = notice.getUser();
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd KK:mm:ss");
		Map<String, String> files = new HashMap<String, String>();
		
		noticeFileRepository.findByNotice(notice).forEach(noticeFile -> {
			String fileUrl = awsS3Service.getFilePath(noticeFile.getNewFileName()); 
			files.put(noticeFile.getOriginFileName(), fileUrl);
		});
		
		notice.plusNoticeHit();
		
		NoticeGetResponseDto noticeGetResponseDto = NoticeGetResponseDto.builder()
				.noticeId(notice.getId())
				.userId(user.getId())
				.userName(user.getUserName())
				.title(notice.getTitle())
				.content(notice.getContent())
				.noticeCode(notice.getNoticeCode())
				.hit(notice.getHit())
				.regTime(notice.getRegTime().format(dateTimeFormatter))
				.files(files)
				.build();
		
		return noticeGetResponseDto;
	}


	@Transactional
	@Override
	public TotalNoticeGetResponseDto getTotalCount(String accessToken) {
		User user = jwtTokenService.convertTokenToUser(accessToken);
		TotalNoticeGetResponseDto totalNoticeGetResponseDto = TotalNoticeGetResponseDto.builder()
				.totalNoticeCount(noticeRepository.countByUser(user))
				.build();
		return totalNoticeGetResponseDto;
	}

	@Transactional
	@Override
	public Notice updateNotice(String accessToken, List<MultipartFile> multipartFile, NoticeUpdateRequestDto noticeUpdateRequestDto) {
		User user = jwtTokenService.convertTokenToUser(accessToken);
		
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).orElse(null);
		if(userDepartment == null)
			return null;
		
		Notice notice = noticeRepository.findById(noticeUpdateRequestDto.getNoticeId()).orElse(null);
		if(notice == null)
			return null;
		
		notice.updateNotice(
				noticeUpdateRequestDto.getTitle(),
				noticeUpdateRequestDto.getContent(), 
				noticeUpdateRequestDto.getNoticeCode());
		
		if(noticeUpdateRequestDto.getNoticeCode() == Code.K01)
			notice.noticeByClass(null, null);
		else if(noticeUpdateRequestDto.getNoticeCode() == Code.K02)
			notice.noticeByGrade(userDepartment.getGradeCode());
		else if(noticeUpdateRequestDto.getNoticeCode() == Code.K03 ||
				noticeUpdateRequestDto.getNoticeCode() == Code.K04 || 
				noticeUpdateRequestDto.getNoticeCode() == Code.K05)
			notice.noticeByClass(userDepartment.getClassCode(), userDepartment.getGradeCode());
		
		awsS3Service.deleteNoticeFile(notice);
		
		if(multipartFile != null)
			awsS3Service.uploadFile(user, notice, multipartFile);
		
		return noticeRepository.save(notice);
	}
	

}
