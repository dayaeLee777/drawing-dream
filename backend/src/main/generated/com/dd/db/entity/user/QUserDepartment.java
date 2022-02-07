package com.dd.db.entity.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserDepartment is a Querydsl query type for UserDepartment
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserDepartment extends EntityPathBase<UserDepartment> {

    private static final long serialVersionUID = -697204508L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserDepartment userDepartment = new QUserDepartment("userDepartment");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    public final EnumPath<com.dd.db.enums.Code> approvalCode = createEnum("approvalCode", com.dd.db.enums.Code.class);

    public final EnumPath<com.dd.db.enums.Code> classCode = createEnum("classCode", com.dd.db.enums.Code.class);

    public final BooleanPath delYn = createBoolean("delYn");

    public final EnumPath<com.dd.db.enums.Code> gradeCode = createEnum("gradeCode", com.dd.db.enums.Code.class);

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final com.dd.db.entity.school.QSchool school;

    public final EnumPath<com.dd.db.enums.Code> stateCode = createEnum("stateCode", com.dd.db.enums.Code.class);

    public final NumberPath<Integer> studentNo = createNumber("studentNo", Integer.class);

    public final QUser user;

    public final EnumPath<com.dd.db.enums.Code> userCode = createEnum("userCode", com.dd.db.enums.Code.class);

    public QUserDepartment(String variable) {
        this(UserDepartment.class, forVariable(variable), INITS);
    }

    public QUserDepartment(Path<? extends UserDepartment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserDepartment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserDepartment(PathMetadata metadata, PathInits inits) {
        this(UserDepartment.class, metadata, inits);
    }

    public QUserDepartment(Class<? extends UserDepartment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.school = inits.isInitialized("school") ? new com.dd.db.entity.school.QSchool(forProperty("school")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

