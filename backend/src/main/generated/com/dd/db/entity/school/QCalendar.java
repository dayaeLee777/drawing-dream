package com.dd.db.entity.school;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCalendar is a Querydsl query type for Calendar
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QCalendar extends EntityPathBase<Calendar> {

    private static final long serialVersionUID = 1623558492L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCalendar calendar = new QCalendar("calendar");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    public final EnumPath<com.dd.db.enums.Code> calendarCode = createEnum("calendarCode", com.dd.db.enums.Code.class);

    public final BooleanPath delYn = createBoolean("delYn");

    public final DatePath<java.time.LocalDate> endDate = createDate("endDate", java.time.LocalDate.class);

    public final EnumPath<com.dd.db.enums.Code> gradeCode = createEnum("gradeCode", com.dd.db.enums.Code.class);

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final QSchool school;

    public final EnumPath<com.dd.db.enums.Code> semesterCode = createEnum("semesterCode", com.dd.db.enums.Code.class);

    public final DatePath<java.time.LocalDate> startDate = createDate("startDate", java.time.LocalDate.class);

    public final EnumPath<com.dd.db.enums.SubCode> testCode = createEnum("testCode", com.dd.db.enums.SubCode.class);

    public QCalendar(String variable) {
        this(Calendar.class, forVariable(variable), INITS);
    }

    public QCalendar(Path<? extends Calendar> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCalendar(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCalendar(PathMetadata metadata, PathInits inits) {
        this(Calendar.class, metadata, inits);
    }

    public QCalendar(Class<? extends Calendar> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.school = inits.isInitialized("school") ? new QSchool(forProperty("school")) : null;
    }

}

