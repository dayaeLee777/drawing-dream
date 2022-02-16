const date = new Date();
date.setHours(date.getHours() - 14); // 테스트용
let hour = date.getHours();
hour = hour < 10 ? "0" + hour.toString() : hour.toString();

let minutes = date.getMinutes();
minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();

let seconds = date.getSeconds();
seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
const now = hour + ":" + minutes + ":" + seconds;
export const getNowPeriod = (period) => {
  let periodCode;
  if (period) {
    period.map((per, index, arr) => {
      if (index == 0) {
        if (per.startTime < now && per.endTime > now) {
          console.log("출석가능시간");
        }
      }
      if (index >= 1) {
        if (arr[index - 1].endTime < now && per.endTime > now) {
          periodCode = per.periodCode;
        }
      }
    });
  }
  return periodCode;
};

export const compareTime = (time) => {
  const splitTime = time.split(":");

  const date2 = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    splitTime[0],
    splitTime[1],
    splitTime[2]
  );
  const elapsedMSec = date2.getTime() - date.getTime();
  const elapsedMin = Math.floor(elapsedMSec / 1000 / 60);

  return elapsedMin;
};
