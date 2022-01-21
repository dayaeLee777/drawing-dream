package com.dd;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.dd.db.entity.user.Auth;
import com.dd.db.entity.user.User;
import com.dd.db.entity.user.UserDepartment;
import com.dd.db.enums.Code;
import com.dd.db.repository.AuthRepository;
import com.dd.db.repository.UserDepartmentRepository;
import com.dd.db.repository.UserRepository;

@SpringBootTest
class DrawingdreamBackendApplicationTests {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	AuthRepository authRepository;
	
	@Autowired
	UserDepartmentRepository userDepartmentRepository;
	
	@Test
	void contextLoads() {
		User user = new User();
		user.setUser_name("싸피");
		userRepository.save(user);
		
		Auth auth = new Auth();
		auth.setUser(user);
		auth.setLoginId("ssafy");
		authRepository.save(auth);
		
		UserDepartment userDepartment = new UserDepartment();
//		Code.B01.getName();	// 코드 설명 받아오기
		userDepartment.setStateCode(Code.B01);
		userDepartment.setUser(user);
		userDepartmentRepository.save(userDepartment);
		
		// 트랜잭션 적용해서 테스트해야함
//		Auth authTest = ar.findByLoginId("ssafy").get();
	}

}
