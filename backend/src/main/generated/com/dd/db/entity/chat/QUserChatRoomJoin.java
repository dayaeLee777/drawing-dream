package com.dd.db.entity.chat;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserChatRoomJoin is a Querydsl query type for UserChatRoomJoin
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserChatRoomJoin extends EntityPathBase<UserChatRoomJoin> {

    private static final long serialVersionUID = -490606270L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserChatRoomJoin userChatRoomJoin = new QUserChatRoomJoin("userChatRoomJoin");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    public final QChatRoom chatRoom;

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final com.dd.db.entity.user.QUser user;

    public QUserChatRoomJoin(String variable) {
        this(UserChatRoomJoin.class, forVariable(variable), INITS);
    }

    public QUserChatRoomJoin(Path<? extends UserChatRoomJoin> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserChatRoomJoin(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserChatRoomJoin(PathMetadata metadata, PathInits inits) {
        this(UserChatRoomJoin.class, metadata, inits);
    }

    public QUserChatRoomJoin(Class<? extends UserChatRoomJoin> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatRoom = inits.isInitialized("chatRoom") ? new QChatRoom(forProperty("chatRoom")) : null;
        this.user = inits.isInitialized("user") ? new com.dd.db.entity.user.QUser(forProperty("user")) : null;
    }

}

