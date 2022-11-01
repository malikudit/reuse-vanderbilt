<<<<<<< HEAD
import { React, useState } from "react";
export default function CountdownTimer(props) {
  var [days, setDays] = useState();
  var [hours, setHours] = useState();
  var [minutes, setMinutes] = useState();
  var [seconds, setSeconds] = useState();

  var newInterval = setInterval(function () {
    var now = new Date().getTime();

    var expDate = new Date(props.countDownDate).getTime();

    var distance = expDate - now;

    setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(newInterval);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);

  return (
    <div>
      {"Time left: "}
      {days}
      {" days, "}
      {hours}
      {" hours, "}
      {minutes}
      {" minutes"}
      {props.productPage === true ? ", " + seconds + " seconds" : ""}
    </div>
  );
=======
export default function CountdownTimer(props) {
  const total = Date.parse(props.countDownDate) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
>>>>>>> main
}
