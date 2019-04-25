import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import {battery} from "power";

//import heart rate sensor from device API
import { HeartRateSensor } from "heart-rate";

//CODE FOR CLOCK

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const glowClock1 = document.getElementById("glowClock1");
const glowClock2 = document.getElementById("glowClock2");
const amPm = document.getElementById("am-pm");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
        if(hours<12)
      {
        amPm.text="AM";
      }
    else if(hours>=12){
      amPm.text="PM";
    }
    hours = hours % 12 || 12;
   hours = util.zeroPad(hours);
          let mins = util.zeroPad(today.getMinutes());
    if (hours>9)
      {
    myLabel.text = `${hours}:${mins}`;
  glowClock1.text = `${hours}:${mins}`;
  glowClock2.text = `${hours}:${mins}`;
      }
    else
      {
   myLabel.text = "0" + `${hours}:${mins}`;
  glowClock1.text = "0" + `${hours}:${mins}`;
  glowClock2.text = "0" + `${hours}:${mins}`;
      }
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
  glowClock1.text = `${hours}:${mins}`;
  glowClock2.text = `${hours}:${mins}`;
}





//CODE FOR HEART RATE SENSOR
const hrm = new HeartRateSensor();
hrm.start();

const hrmData = document.getElementById("hrm-data");

function refreshData() {
 const data = {
   hrm: {
     heartRate: hrm.heartRate ? hrm.heartRate : 0
   }
 }

  hrmData.text = hrm.heartRate;}

refreshData();
setInterval(refreshData, 1000);



//CODE FOR STEPS
import { today } from "user-activity";
//console.log((today.local.steps || 0) + " steps");
const todaySteps = today.local.steps || 0;
const stepsData = document.getElementById("steps-data");
stepsData.text=todaySteps;


//CODE FOR DATE
  let newDay = new Date();
  let day = newDay.getDate();
  let wday = newDay.getDay();
//  let month = newDay.getMonth();

//code to display DD Month YYYY
let months = ["January", "February",  "March",  "April",  "May",  "June",  "July",  "August",  "September",  "October",  "November", "December"];
let monthName =  months[newDay.getMonth()] 
let year = newDay.getFullYear();
const dateData = document.getElementById("date-data");
dateData.text=day+" "+monthName+" "+year;

    




//CODE FOR CALORIES BURNED
const calsData = document.getElementById("calories-data");
  calsData.text = today.adjusted.calories;

//CODE FOR FLOORS
const floorsData = document.getElementById("floors-data");
const todayFloors = today.local.elevationGain || 0;

console.log((today.local.elevationGain || 0) + " floors");

floorsData.text=todayFloors;


//Battery code
const batImg = document.getElementById("batImg");
const batPer = document.getElementById("batPercent");

battery.onchange = (charger, evt) =>
{
if (battery.chargeLevel>75)
  {
    batImg.href="100EvenBiggerBattery.png"
  }
else if (battery.chargeLevel<75 && battery.chargeLevel>50)
  {
    batImg.href="75EvenBiggerBattery.png"
  }
  else if (battery.chargeLevel<50 && battery.chargeLevel>25)
  {
    batImg.href="50EvenBiggerBattery.png"
  }
  else if (battery.chargeLevel<25)
  {
    batImg.href="25EvenBiggerBattery.png"
  }
   batPer.text = (battery.chargeLevel) + "%";
}











