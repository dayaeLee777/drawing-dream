package com.dd.db.entity.school;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QSchool is a Querydsl query type for School
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSchool extends EntityPathBase<School> {

    private static final long serialVersionUID = 1261492498L;

    public static final QSchool school = new QSchool("school");

    public final com.dd.db.entity.QBaseEntity _super = new com.dd.db.entity.QBaseEntity(this);

    public final BooleanPath delYn = createBoolean("delYn");

    //inherited
    public final ComparablePath<java.util.UUID> id = _super.id;

    public final EnumPath<com.dd.db.enums.Code> schoolCode = createEnum("schoolCode", com.dd.db.enums.Code.class);

    public final StringPath schoolName = createString("schoolName");

    public final StringPath schoolSerialNo = createString("schoolSerialNo");

    public QSchool(String variable) {
        super(School.class, forVariable(variable));
    }

    public QSchool(Path<? extends School> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSchool(PathMetadata metadata) {
        super(School.class, metadata);
    }

}

