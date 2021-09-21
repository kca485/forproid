function CountDown(targetDate) {
  this._targetTime = targetDate.getTime();
}

CountDown.prototype.start = function() {
  this._timer = setInterval((function() {
    const currentTime = Date.now();
    const milisecondsDiff = this._targetTime - currentTime;

    if (milisecondsDiff < 0) {
      this._hasPassed = true;
      this.stop();
      return;
    };

    this._seconds = Math.floor(milisecondsDiff / 1000) % 60;
    this._minutes = Math.floor(milisecondsDiff / (1000 * 60) % 60);
    this._hours = Math.floor(milisecondsDiff / (1000 * 60 * 60) % 24);
    this._days = Math.floor(milisecondsDiff / (1000 * 60 * 60 * 24));
    
    if (this.secondsElement) updateSecondsElement.call(this);
    if (this.minutesElement) updateMinutesElement.call(this);
    if (this.hoursElement) updateHoursElement.call(this);
    if (this.daysElement) updateDaysElement.call(this);

  }).bind(this), 1000);
  
  function updateSecondsElement() {
    let secondsString = '' + this._seconds;
    if (secondsString.length < 2) {
      secondsString = '0' + secondsString
    }
    this.secondsElement.textContent = secondsString;
  }
  function updateMinutesElement() {
    let minutesString = '' + this._minutes;
    if (minutesString.length < 2) {
      minutesString = '0' + minutesString
    }
    this.minutesElement.textContent = minutesString;
  }
  function updateHoursElement() {
    let hoursString = '' + this._hours;
    if (hoursString.length < 2) {
      hoursString = '0' + hoursString
    }
    this.hoursElement.textContent = hoursString;
  }
  function updateDaysElement() {
    let daysString = '' + this._days;
    this.daysElement.textContent = daysString;
  }
};

CountDown.prototype.stop = function() {
  clearInterval(this._timer);
};

CountDown.prototype.setSecondsElement = function(elementId) {
  this.secondsElement = document.getElementById(elementId);
};
CountDown.prototype.setMinutesElement = function(elementId) {
  this.minutesElement = document.getElementById(elementId);
};
CountDown.prototype.setHoursElement = function(elementId) {
  this.hoursElement = document.getElementById(elementId);
};
CountDown.prototype.setDaysElement = function(elementId) {
  this.daysElement = document.getElementById(elementId);
};

CountDown.prototype.hasPassed = function() {
  const timeDiff = this._targetTime - Date.now();
  if (timeDiff > 0) {
    return false;
  } else {
    this._hasPassed = true;
    return true;
  }
};

const targetDate = new Date('16 October 2021 00:00 GMT+07:00');
const countDown = new CountDown(targetDate);
countDown.setSecondsElement('seconds');
countDown.setMinutesElement('minutes');
countDown.setHoursElement('hours');
countDown.setDaysElement('days');
countDown.start();