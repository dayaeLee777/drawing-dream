package com.dd.db.entity.schoollife;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTimeTable is a Querydsl query type for TimeTable
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QTimeTable extends EntityPathBase<TimeTable> {

    private static final long serialVersionUID = -860130657L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTimeTable timeTable = new QTimeTable("timeTable");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    public final com.dd.db.entity.onlineclass.QCourse course;

    public final EnumPath<com.dd.db.enums.Code> dayCode = createEnum("dayCode", com.dd.db.enums.Code.class);

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final EnumPath<com.dd.db.enums.Code> periodCode = createEnum("periodCode", com.dd.db.enums.Code.class);

    public final EnumPath<com.dd.db.enums.Code> semesterCode = createEnum("semesterCode", com.dd.db.enums.Code.class);

    public final com.dd.db.entity.user.QUser user;

    public QTimeTable(String variable) {
        this(TimeTable.class, forVariable(variable), INITS);
    }

    public QTimeTable(Path<? extends TimeTable> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTimeTable(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTimeTable(PathMetadata metadata, PathInits inits) {
        this(TimeTable.class, metadata, inits);
    }

    public QTimeTable(Class<? extends TimeTable> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.course = inits.isInitialized("course") ? new com.dd.db.entity.onlineclass.QCourse(forProperty("course"), inits.get("course")) : null;
        this.user = inits.isInitialized("user") ? new com.dd.db.entity.user.QUser(forProperty("user")) : null;
    }

}

