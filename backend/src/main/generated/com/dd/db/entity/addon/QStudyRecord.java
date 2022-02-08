package com.dd.db.entity.addon;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudyRecord is a Querydsl query type for StudyRecord
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QStudyRecord extends EntityPathBase<StudyRecord> {

    private static final long serialVersionUID = -673063824L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudyRecord studyRecord = new QStudyRecord("studyRecord");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    public final BooleanPath delYn = createBoolean("delYn");

    public final TimePath<java.time.LocalTime> durationTime = createTime("durationTime", java.time.LocalTime.class);

    public final DateTimePath<java.time.LocalDateTime> endTime = createDateTime("endTime", java.time.LocalDateTime.class);

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final DateTimePath<java.time.LocalDateTime> startTime = createDateTime("startTime", java.time.LocalDateTime.class);

    public final DatePath<java.time.LocalDate> studyDate = createDate("studyDate", java.time.LocalDate.class);

    public final StringPath title = createString("title");

    public final com.dd.db.entity.user.QUser user;

    public QStudyRecord(String variable) {
        this(StudyRecord.class, forVariable(variable), INITS);
    }

    public QStudyRecord(Path<? extends StudyRecord> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudyRecord(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudyRecord(PathMetadata metadata, PathInits inits) {
        this(StudyRecord.class, metadata, inits);
    }

    public QStudyRecord(Class<? extends StudyRecord> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.dd.db.entity.user.QUser(forProperty("user")) : null;
    }

}

