package com.dd.db.entity.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 1877288946L;

    public static final QUser user = new QUser("user");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    public final StringPath address = createString("address");

    public final StringPath addressDetail = createString("addressDetail");

    public final BooleanPath delYn = createBoolean("delYn");

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final StringPath parentPhone = createString("parentPhone");

    public final StringPath phone = createString("phone");

    public final StringPath userEmail = createString("userEmail");

    public final StringPath userName = createString("userName");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

