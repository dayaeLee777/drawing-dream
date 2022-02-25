package com.dd.db.entity.files;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOnlineClassFile is a Querydsl query type for OnlineClassFile
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QOnlineClassFile extends EntityPathBase<OnlineClassFile> {

    private static final long serialVersionUID = 446185006L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOnlineClassFile onlineClassFile = new QOnlineClassFile("onlineClassFile");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final StringPath newFileName = createString("newFileName");

    public final com.dd.db.entity.onlineclass.QOnlineClass onlineClass;

    public final StringPath originFileName = createString("originFileName");

    public final com.dd.db.entity.user.QUser user;

    public QOnlineClassFile(String variable) {
        this(OnlineClassFile.class, forVariable(variable), INITS);
    }

    public QOnlineClassFile(Path<? extends OnlineClassFile> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOnlineClassFile(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOnlineClassFile(PathMetadata metadata, PathInits inits) {
        this(OnlineClassFile.class, metadata, inits);
    }

    public QOnlineClassFile(Class<? extends OnlineClassFile> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.onlineClass = inits.isInitialized("onlineClass") ? new com.dd.db.entity.onlineclass.QOnlineClass(forProperty("onlineClass"), inits.get("onlineClass")) : null;
        this.user = inits.isInitialized("user") ? new com.dd.db.entity.user.QUser(forProperty("user")) : null;
    }

}

