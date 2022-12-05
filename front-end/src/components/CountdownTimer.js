import { React, useState } from "react";

export default function CountdownTimer(props) {
  var [distance, setDistance] = useState();
  var [days, setDays] = useState();
  var [hours, setHours] = useState();
  var [minutes, setMinutes] = useState();
  var [seconds, setSeconds] = useState();

  var newInterval = setInterval(function () {
    var now = new Date().getTime();

    var expDate = new Date(props.countDownDate).getTime();

    distance = expDate - now;
    setDistance(distance);

    setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

    if (distance < 0) {
      clearInterval(newInterval);
    }
  }, 1000);

  if (props.productPage) {
    if (days < 0) {
      return <div>Listing Has Expired</div>;
    } else {
      if (days < 1 && hours < 1 && minutes < 1) {
        return <div>{seconds} seconds left</div>;
      }
      if (days < 1 && hours < 1) {
        return <div>{minutes} minutes left</div>;
      }
      if (days < 1) {
        return <div>{hours} hours left</div>;
      }
      if (days === 1) {
        return (
          <div>
            {days} day {hours} hours left
          </div>
        );
      }
      return <div>{days} days left</div>;
    }
  } else {
    if (days < 0) {
      return <div>Expired</div>;
    }
    if (days < 1 && hours < 1 && minutes < 1) {
      return <div>{seconds} seconds left</div>;
    }
    if (days < 1 && hours < 1) {
      return <div>{minutes} minutes left</div>;
    }
    if (days < 1) {
      return <div>{hours} hours left</div>;
    }
    if (days === 1) {
      return (
        <div>
          {days} day {hours} hours left
        </div>
      );
    }
    return <div>{days} days left</div>;
  }
}
