let currentTimeFrame = "weekly";
//add event listeners
const dailyEle = document.querySelector(".daily");
const weeklyEle = document.querySelector(".weekly");
const monthlyEle = document.querySelector(".monthly");

//current and previous times
const allCurrent = document.querySelectorAll(".current");
const allPrevious = document.querySelectorAll(".previous");

const changeTimeframe = (event) => {
  const newTimeFrame = event.target.className;
  let timeIndicator = "Last Week";
  if (newTimeFrame === currentTimeFrame) return;
  if (newTimeFrame == "daily") {
    timeIndicator = "Yesterday";
  } else if (newTimeFrame == "monthly") {
    timeIndicator = "Last Month";
  }
  fetch("./data.json")
    .then((res) => res.json())
    .then((json) => {
      json.forEach((activity, index) => {
        let currentTime = 0;
        let previousTime = 0;
        if (newTimeFrame === "daily") {
          currentTime = activity.timeframes.daily.current;
          previousTime = activity.timeframes.daily.previous;
        } else if (newTimeFrame === "monthly") {
          currentTime = activity.timeframes.monthly.current;
          previousTime = activity.timeframes.monthly.previous;
        } else {
          currentTime = activity.timeframes.weekly.current;
          previousTime = activity.timeframes.weekly.previous;
        }

        allCurrent[index].innerHTML = `${currentTime}hrs`;
        allPrevious[index].innerHTML = `${timeIndicator} - ${previousTime}hrs`;
      });
    });
  currentTimeFrame = newTimeFrame;
};

dailyEle.addEventListener("click", changeTimeframe);
weeklyEle.addEventListener("click", changeTimeframe);
monthlyEle.addEventListener("click", changeTimeframe);
