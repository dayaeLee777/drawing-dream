package com.dd.db.entity.onlineclass;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOnlineClass is a Querydsl query type for OnlineClass
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QOnlineClass extends EntityPathBase<OnlineClass> {

    private static final long serialVersionUID = -957752800L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOnlineClass onlineClass = new QOnlineClass("onlineClass");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    public final QCourse course;

    public final DateTimePath<java.time.LocalDateTime> endTime = createDateTime("endTime", java.time.LocalDateTime.class);

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final DateTimePath<java.time.LocalDateTime> startTime = createDateTime("startTime", java.time.LocalDateTime.class);

    public QOnlineClass(String variable) {
        this(OnlineClass.class, forVariable(variable), INITS);
    }

    public QOnlineClass(Path<? extends OnlineClass> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOnlineClass(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOnlineClass(PathMetadata metadata, PathInits inits) {
        this(OnlineClass.class, metadata, inits);
    }

    public QOnlineClass(Class<? extends OnlineClass> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.course = inits.isInitialized("course") ? new QCourse(forProperty("course"), inits.get("course")) : null;
    }

}

