package com.dd.db.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.chat.ChatRoom;
import com.dd.db.entity.chat.UserChatRoomJoin;
import com.dd.db.entity.user.User;

@Repository
public interface UserChatRoomJoinRepository extends JpaRepository<UserChatRoomJoin, UUID> {

	@Query("SELECT uc.chatRoom FROM UserChatRoomJoin uc JOIN User u ON (uc.user = u AND u.id = :userId)")
	Optional<List<ChatRoom>> findByUserId(@Param("userId") UUID userId);

	@Query("SELECT uc.user FROM UserChatRoomJoin uc JOIN ChatRoom r ON (uc.chatRoom = r AND r.id = :roomId)")
	Optional<List<User>> findByRoomId(@Param("roomId") UUID roomId);

	void deleteByUserAndChatRoom(User user, ChatRoom chatRoom);

}
