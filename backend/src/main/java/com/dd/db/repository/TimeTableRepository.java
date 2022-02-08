package com.dd.db.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dd.db.entity.schoollife.TimeTable;

@Repository
public interface TimeTableRepository extends JpaRepository<TimeTable, UUID> {

	List<TimeTable> findBydelYnOrderByDayCodeAscPeriodCodeAsc(boolean delYn);

}
