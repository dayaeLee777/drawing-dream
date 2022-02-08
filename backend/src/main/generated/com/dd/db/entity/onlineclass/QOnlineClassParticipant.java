package com.dd.db.entity.onlineclass;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOnlineClassParticipant is a Querydsl query type for OnlineClassParticipant
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QOnlineClassParticipant extends EntityPathBase<OnlineClassParticipant> {

    private static final long serialVersionUID = -878302989L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOnlineClassParticipant onlineClassParticipant = new QOnlineClassParticipant("onlineClassParticipant");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final QOnlineClass onlineClass;

    public final com.dd.db.entity.user.QUser student;

    public QOnlineClassParticipant(String variable) {
        this(OnlineClassParticipant.class, forVariable(variable), INITS);
    }

    public QOnlineClassParticipant(Path<? extends OnlineClassParticipant> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOnlineClassParticipant(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOnlineClassParticipant(PathMetadata metadata, PathInits inits) {
        this(OnlineClassParticipant.class, metadata, inits);
    }

    public QOnlineClassParticipant(Class<? extends OnlineClassParticipant> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.onlineClass = inits.isInitialized("onlineClass") ? new QOnlineClass(forProperty("onlineClass"), inits.get("onlineClass")) : null;
        this.student = inits.isInitialized("student") ? new com.dd.db.entity.user.QUser(forProperty("student")) : null;
    }

}

