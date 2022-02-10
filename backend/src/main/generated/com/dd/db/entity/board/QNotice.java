package com.dd.db.entity.board;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNotice is a Querydsl query type for Notice
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QNotice extends EntityPathBase<Notice> {

    private static final long serialVersionUID = 1091842236L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QNotice notice = new QNotice("notice");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    public final EnumPath<com.dd.db.enums.Code> classCode = createEnum("classCode", com.dd.db.enums.Code.class);

    public final StringPath content = createString("content");

    public final BooleanPath delYn = createBoolean("delYn");

    public final EnumPath<com.dd.db.enums.Code> gradeCode = createEnum("gradeCode", com.dd.db.enums.Code.class);

    public final NumberPath<Integer> hit = createNumber("hit", Integer.class);

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final EnumPath<com.dd.db.enums.Code> noticeCode = createEnum("noticeCode", com.dd.db.enums.Code.class);

    public final DateTimePath<java.time.LocalDateTime> regTime = createDateTime("regTime", java.time.LocalDateTime.class);

    public final com.dd.db.entity.school.QSchool school;

    public final StringPath title = createString("title");

    public final com.dd.db.entity.user.QUser user;

    public QNotice(String variable) {
        this(Notice.class, forVariable(variable), INITS);
    }

    public QNotice(Path<? extends Notice> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QNotice(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QNotice(PathMetadata metadata, PathInits inits) {
        this(Notice.class, metadata, inits);
    }

    public QNotice(Class<? extends Notice> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.school = inits.isInitialized("school") ? new com.dd.db.entity.school.QSchool(forProperty("school")) : null;
        this.user = inits.isInitialized("user") ? new com.dd.db.entity.user.QUser(forProperty("user")) : null;
    }

}

