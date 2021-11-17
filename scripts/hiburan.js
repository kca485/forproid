// video player

const ytScriptTag = document.createElement('script');
ytScriptTag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(ytScriptTag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('atsiri');
}

const playButton = document.getElementById('play-button');
const overlay = document.querySelector('.overlay');
playButton.addEventListener('click', function() {
  overlay.style.display = 'none';
  player.playVideo();
});


// countdown

function CountDown(targetDate) {
  this._targetTime = targetDate.getTime();
}

CountDown.prototype.start = function() {
  this._timer = setInterval((function() {
    const currentTime = Date.now();
    const milisecondsDiff = this._targetTime - currentTime;

    this._seconds = Math.floor(milisecondsDiff / 1000) % 60;
    this._minutes = Math.floor(milisecondsDiff / (1000 * 60) % 60);
    this._hours = Math.floor(milisecondsDiff / (1000 * 60 * 60) % 24);
    this._days = Math.floor(milisecondsDiff / (1000 * 60 * 60 * 24));
    
    if (this.secondsElement) updateSecondsElement.call(this);
    if (this.minutesElement) updateMinutesElement.call(this);
    if (this.hoursElement) updateHoursElement.call(this);
    if (this.daysElement) updateDaysElement.call(this);

    if (milisecondsDiff < 0) {
      this._hasPassed = true;
      this.stop();
    }
  }).bind(this), 1000);
  
  function updateSecondsElement() {
    if (this._seconds < 0) this._seconds = 0;

    let secondsString = '' + this._seconds;
    if (secondsString.length < 2) {
      secondsString = '0' + secondsString
    }
    this.secondsElement.textContent = secondsString;
  }
  function updateMinutesElement() {
    if (this._minutes < 0) this._minutes = 0;

    let minutesString = '' + this._minutes;
    if (minutesString.length < 2) {
      minutesString = '0' + minutesString
    }
    this.minutesElement.textContent = minutesString;
  }
  function updateHoursElement() {
    if (this._hours < 0) this._hours = 0;

    let hoursString = '' + this._hours;
    if (hoursString.length < 2) {
      hoursString = '0' + hoursString
    }
    this.hoursElement.textContent = hoursString;
  }
  function updateDaysElement() {
    if (this._days < 0) this._days = 0;

    let daysString = '0' + this._days;
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

const targetDate = new Date('14 November 2021 19:00 UTC+07:00');
const countDown = new CountDown(targetDate);
countDown.setSecondsElement('seconds');
countDown.setMinutesElement('minutes');
countDown.setHoursElement('hours');
countDown.setDaysElement('days');
countDown.start();