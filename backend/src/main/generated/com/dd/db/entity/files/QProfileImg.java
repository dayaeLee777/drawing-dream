package com.dd.db.entity.files;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProfileImg is a Querydsl query type for ProfileImg
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QProfileImg extends EntityPathBase<ProfileImg> {

    private static final long serialVersionUID = -967323379L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProfileImg profileImg = new QProfileImg("profileImg");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final StringPath newFileName = createString("newFileName");

    public final StringPath originFileName = createString("originFileName");

    public final com.dd.db.entity.user.QUser user;

    public QProfileImg(String variable) {
        this(ProfileImg.class, forVariable(variable), INITS);
    }

    public QProfileImg(Path<? extends ProfileImg> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProfileImg(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProfileImg(PathMetadata metadata, PathInits inits) {
        this(ProfileImg.class, metadata, inits);
    }

    public QProfileImg(Class<? extends ProfileImg> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.dd.db.entity.user.QUser(forProperty("user")) : null;
    }

}

