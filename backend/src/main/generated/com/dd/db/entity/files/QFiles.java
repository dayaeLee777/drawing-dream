package com.dd.db.entity.files;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFiles is a Querydsl query type for Files
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QFiles extends EntityPathBase<Files> {

    private static final long serialVersionUID = -1955696924L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFiles files = new QFiles("files");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final StringPath newFileName = createString("newFileName");

    public final StringPath originFileName = createString("originFileName");

    public final com.dd.db.entity.user.QUser user;

    public QFiles(String variable) {
        this(Files.class, forVariable(variable), INITS);
    }

    public QFiles(Path<? extends Files> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFiles(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFiles(PathMetadata metadata, PathInits inits) {
        this(Files.class, metadata, inits);
    }

    public QFiles(Class<? extends Files> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.dd.db.entity.user.QUser(forProperty("user")) : null;
    }

}

