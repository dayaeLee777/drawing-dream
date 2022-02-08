package com.dd.db.entity.board;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCommunity is a Querydsl query type for Community
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCommunity extends EntityPathBase<Community> {

    private static final long serialVersionUID = -2094163067L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCommunity community = new QCommunity("community");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    public final StringPath content = createString("content");

    public final BooleanPath delYn = createBoolean("delYn");

    public final NumberPath<Integer> hit = createNumber("hit", Integer.class);

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final DateTimePath<java.time.LocalDateTime> regTime = createDateTime("regTime", java.time.LocalDateTime.class);

    public final com.dd.db.entity.school.QSchool school;

    public final StringPath title = createString("title");

    public final com.dd.db.entity.user.QUser user;

    public QCommunity(String variable) {
        this(Community.class, forVariable(variable), INITS);
    }

    public QCommunity(Path<? extends Community> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCommunity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCommunity(PathMetadata metadata, PathInits inits) {
        this(Community.class, metadata, inits);
    }

    public QCommunity(Class<? extends Community> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.school = inits.isInitialized("school") ? new com.dd.db.entity.school.QSchool(forProperty("school")) : null;
        this.user = inits.isInitialized("user") ? new com.dd.db.entity.user.QUser(forProperty("user")) : null;
    }

}

