export const getNowPeriod = (period) => {
  const date = new Date();
  date.setHours(date.getHours() - 4); // 테스트용
  let hour = date.getHours();
  hour = hour < 10 ? "0" + hour.toString() : hour.toString();

  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();

  let seconds = date.getSeconds();
  seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
  const time = hour + ":" + minutes + ":" + seconds;
  //   console.log(time);
  let periodCode;
  if (period) {
    period.map((per, index, arr) => {
      if (index == 0) {
        if (per.startTime < time && per.endTime > time) {
          console.log("출석가능시간");
        }
      }
      if (index >= 1) {
        if (arr[index - 1].endTime < time && per.endTime > time) {
          // console.log(per.periodCode);
          periodCode = per.periodCode;
        }
      }
    });
  }
  return periodCode;
};
