import commonCode from "config/commonCode";
import React from "react";

const DayItem = ({ data }) => {
  return (
    <div>
      {data.length !== 0 &&
        commonCode[data[0].courseCode.substr(0, 1)][
          data[0].courseCode.substr(0, 3)
        ][data[0].courseCode]}
    </div>
  );
};

export default DayItem;
