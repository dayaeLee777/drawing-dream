package com.dd.db.entity.addon;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChecklist is a Querydsl query type for Checklist
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QChecklist extends EntityPathBase<Checklist> {

    private static final long serialVersionUID = 1781876764L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChecklist checklist = new QChecklist("checklist");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    public final StringPath content = createString("content");

    public final BooleanPath delYn = createBoolean("delYn");

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final BooleanPath isChecked = createBoolean("isChecked");

    public final DateTimePath<java.time.LocalDateTime> regTime = createDateTime("regTime", java.time.LocalDateTime.class);

    public final com.dd.db.entity.user.QUser user;

    public QChecklist(String variable) {
        this(Checklist.class, forVariable(variable), INITS);
    }

    public QChecklist(Path<? extends Checklist> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChecklist(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChecklist(PathMetadata metadata, PathInits inits) {
        this(Checklist.class, metadata, inits);
    }

    public QChecklist(Class<? extends Checklist> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.dd.db.entity.user.QUser(forProperty("user")) : null;
    }

}

