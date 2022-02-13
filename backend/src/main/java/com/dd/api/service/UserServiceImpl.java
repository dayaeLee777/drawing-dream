package com.dd.api.service;

import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dd.api.dto.request.PasswordCheckRequestDTO;
import com.dd.api.dto.request.PasswordUpdateRequestDto;
import com.dd.api.dto.request.UserRegisterRequestDto;
import com.dd.api.dto.request.UserUpdateRequestDto;
import com.dd.api.dto.response.UserInfoResponseDto;
import com.dd.db.entity.school.School;
import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.enums.Code;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.SchoolRepository;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.db.repository.UserRepository;
import com.dd.security.util.JwtAuthenticationProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

	private final PasswordEncoder passwordEncoder;

	private final AuthRepository authRepository;

	private final UserRepository userRepository;

	private final UserDepartmentRepository userDepartmentRepository;

	private final SchoolRepository schoolRepository;

	private final JwtAuthenticationProvider jwtAuthenticationProvider;

	@Transactional
	@Override
	public void signUp(UserRegisterRequestDto userRegisterRequestDto) {

		// user builder - 생성
		User user = User.builder().userName(userRegisterRequestDto.getUserName())
				.userEmail(userRegisterRequestDto.getUserEmail()).phone(userRegisterRequestDto.getPhone())
				.parentPhone(userRegisterRequestDto.getParentPhone()).address(userRegisterRequestDto.getAddress())
				.addressDetail(userRegisterRequestDto.getAddressDetail()).build();

		userRepository.save(user);

		// auth
		Auth auth = Auth.builder().loginId(userRegisterRequestDto.getLoginId())
				.password(passwordEncoder.encode(userRegisterRequestDto.getPassword())).user(user).build();

		authRepository.save(auth);

		// schoolSerialNo 값으로 찾은 학교가 있으면 바로 소속 저장
		// 없으면 school 부터 저장
		if (!schoolRepository.findBySchoolSerialNo(userRegisterRequestDto.getSchoolSerialNo()).isPresent()) {

			// 초등학교면 D01, 고등학교면 D03 ** 임시로 적용해놓는거 **
			String schoolStr = userRegisterRequestDto.getSchoolName();
			String schoolSubStr = schoolStr.substring(schoolStr.length() - 4, schoolStr.length() - 1);
			Code schoolCode = null;

			if (schoolStr.equals("초등학교")) {
				schoolCode = Code.D01;
			} else {
				schoolCode = Code.D03;
			}

			School newSchool = School.builder().schoolCode(schoolCode)
					.schoolName(userRegisterRequestDto.getSchoolName())
					.schoolSerialNo(userRegisterRequestDto.getSchoolSerialNo()).build();

			schoolRepository.save(newSchool);

		}

		School school = schoolRepository.findBySchoolSerialNo(userRegisterRequestDto.getSchoolSerialNo()).get();
		// UserDepartment
		UserDepartment userDepartment = UserDepartment.builder().gradeCode(userRegisterRequestDto.getGradeCode())
				.classCode(userRegisterRequestDto.getClassCode()).studentNo(userRegisterRequestDto.getStudentNo())
				.userCode(Code.A04).school(school).user(user).build();

		userDepartmentRepository.save(userDepartment);

	}

	@Transactional
	@Override
	public void updateUser(String accessToken, UserUpdateRequestDto userUpdateRequestDto) {

		String loginId = GetLoginIdFromToken(accessToken);

		// 유저 정보 update
		User user = authRepository.findByLoginId(loginId).get().getUser();
		user.update(userUpdateRequestDto.getPhone(), userUpdateRequestDto.getParentPhone(),
				userUpdateRequestDto.getUserEmail(), userUpdateRequestDto.getAddress(),
				userUpdateRequestDto.getAddressDetail());

		userRepository.save(user);

		// UserDepartment 정보 update
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		userDepartment.update(userUpdateRequestDto.getGradeCode(), userUpdateRequestDto.getClassCode(),
				userUpdateRequestDto.getStudentNo());

		userDepartmentRepository.save(userDepartment);

	}

	@Transactional
	@Override
	public boolean checkPassword(String accessToken, PasswordCheckRequestDTO passwordCheckRequestDTO) {

		String loginId = GetLoginIdFromToken(accessToken);
		Auth auth = authRepository.findByLoginId(loginId).get();

		if (passwordEncoder.matches(passwordCheckRequestDTO.getPassword(), auth.getPassword()))
			return true;

		return false;

	}

	@Transactional
	@Override
	public boolean updatePassword(String accessToken, PasswordUpdateRequestDto passwordUpdateRequestDto) {

		String loginId = GetLoginIdFromToken(accessToken);
		Auth auth = authRepository.findByLoginId(loginId).get();

		// 변경하려는 비밀번호가 현재 비밀번호와 같으면 false;
		if (passwordEncoder.matches(passwordUpdateRequestDto.getPassword(), auth.getPassword()))
			return false;

		// 비밀번호 update
		auth.update(passwordEncoder.encode(passwordUpdateRequestDto.getPassword()));
		authRepository.save(auth);

		return true;

	}

	@Transactional
	@Override
//	public void deleteUser(String accessToken, UUID userId) {
	public void deleteUser(UUID userId) {

		// user 삭제여부 true 설정
		User user = userRepository.findById(userId).get();
		user.update(true);

		userRepository.save(user);

		// auth 삭제여부 true 설정
		Auth auth = authRepository.findByUser(user).get();
		auth.update(true);

		authRepository.save(auth);

		// userDepartment 삭제여부 true 설정
		UserDepartment userDepartment = userDepartmentRepository.findByUser(user).get();
		userDepartment.update(true);

		userDepartmentRepository.save(userDepartment);

	}

	@Override
//	public UserInfoResponseDto getUserInfo(String accessToken, UUID userId) {
	public UserInfoResponseDto getUserInfo(UUID userId) {

		User user = userRepository.findById(userId)
				.orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다. id = " + userId));

		return new UserInfoResponseDto(user);

	}

	@Override
	public UUID getUserId(String loginId) {

		Auth auth = authRepository.findByLoginId(loginId).get();

		return auth.getUser().getId();

	}

	@Override
	public boolean checkLoginIdExists(String loginId) {

		return authRepository.findByLoginId(loginId).isPresent();

	}

	@Override
	public String GetLoginIdFromToken(String accessToken) {

		String token = accessToken.split(" ")[1];

		return jwtAuthenticationProvider.getUsername(token);

	}
}
