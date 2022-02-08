package com.dd.db.entity.schoollife;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QScore is a Querydsl query type for Score
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QScore extends EntityPathBase<Score> {

    private static final long serialVersionUID = 429948720L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QScore score1 = new QScore("score1");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    public final BooleanPath delYn = createBoolean("delYn");

    public final EnumPath<com.dd.db.enums.Code> gradeCode = createEnum("gradeCode", com.dd.db.enums.Code.class);

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final NumberPath<Float> score = createNumber("score", Float.class);

    public final EnumPath<com.dd.db.enums.Code> semestertCode = createEnum("semestertCode", com.dd.db.enums.Code.class);

    public final EnumPath<com.dd.db.enums.SubCode> subjectCode = createEnum("subjectCode", com.dd.db.enums.SubCode.class);

    public final EnumPath<com.dd.db.enums.SubCode> testCode = createEnum("testCode", com.dd.db.enums.SubCode.class);

    public final com.dd.db.entity.user.QUser user;

    public QScore(String variable) {
        this(Score.class, forVariable(variable), INITS);
    }

    public QScore(Path<? extends Score> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QScore(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QScore(PathMetadata metadata, PathInits inits) {
        this(Score.class, metadata, inits);
    }

    public QScore(Class<? extends Score> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.dd.db.entity.user.QUser(forProperty("user")) : null;
    }

}

