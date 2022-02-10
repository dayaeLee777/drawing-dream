import commonCode from 'config/commonCode';
import React from 'react';
import DayItem from './DayItem';
import { Class } from './WeekList';

const DayList = ({data}) => {
  // console.log(data);
  return (
    <Class>
      {Object.entries(commonCode.I).map(([key, value]) => (
        (key !== "I00") && <DayItem data={data.filter((period) => (period.periodCode === key))} key={key}/>
      ))}
    </Class>
  );
};

export default DayList;