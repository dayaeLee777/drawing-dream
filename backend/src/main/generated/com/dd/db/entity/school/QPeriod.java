package com.dd.db.entity.school;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPeriod is a Querydsl query type for Period
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPeriod extends EntityPathBase<Period> {

    private static final long serialVersionUID = 1177744223L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPeriod period = new QPeriod("period");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    public final BooleanPath delYn = createBoolean("delYn");

    public final TimePath<java.time.LocalTime> endTime = createTime("endTime", java.time.LocalTime.class);

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final EnumPath<com.dd.db.enums.Code> periodCode = createEnum("periodCode", com.dd.db.enums.Code.class);

    public final QSchool school;

    public final TimePath<java.time.LocalTime> startTime = createTime("startTime", java.time.LocalTime.class);

    public QPeriod(String variable) {
        this(Period.class, forVariable(variable), INITS);
    }

    public QPeriod(Path<? extends Period> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPeriod(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPeriod(PathMetadata metadata, PathInits inits) {
        this(Period.class, metadata, inits);
    }

    public QPeriod(Class<? extends Period> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.school = inits.isInitialized("school") ? new QSchool(forProperty("school")) : null;
    }

}

