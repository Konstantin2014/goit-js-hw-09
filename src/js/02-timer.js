// ================== imports  ==================
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// ================== take refs  ==================

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  dateFields: document.querySelectorAll('.field'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutessValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
  timerLable: document.querySelectorAll('.label'),
};

// ================== basic style  ==================
// refs.dateInput.type = 'date';
//  refs.dateInput.disabled = false;
refs.startButton.disabled = true;

refs.startButton.style.paddingTop = '7px';
refs.startButton.style.paddingBottom = '6px';
refs.startButton.style.fontSize = '24px';
refs.startButton.style.textAlign = 'center';

refs.dateInput.style.padding = '6px';
refs.dateInput.style.fontSize = '25px';
refs.dateInput.style.textAlign = 'center';
refs.timer.style.display = 'flex';

refs.dateFields.forEach(field => {
  field.style.marginRight = '20px';
  field.style.marginTop = '20px';
  field.style.fontSize = '25px';
  field.style.textAlign = 'center';
  field.style.fontWeight = '500';
});

refs.timerLable.forEach(lable => {
  lable.style.display = 'block';
});

// ================== flatpickr init ==================

let currentTime = null;
let selectedUnixTime = null;

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentTime = Date.now();
    selectedUnixTime = selectedDates[0].getTime();

    console.log(currentTime);
    console.log(selectedUnixTime);
    if (currentTime > selectedUnixTime) {
      // window.alert('Please choose a date in the future')
      Notify.failure('Please choose a date in the future');
      return;
    } else {
      if (timerId === null) {
        refs.startButton.disabled = false;
        refs.startButton.addEventListener('click', onStartButton);
      }
    }
  },
};

flatpickr(refs.dateInput, flatpickrOptions);

// ================== make timer ==================
let timerId = null;

function onStartButton() {
  refs.dateInput.disabled = true;
  refs.startButton.removeEventListener('click', onStartButton);
  refs.startButton.disabled = true;
  Notify.success('Your timer start');
  timerId = setInterval(() => {
    currentTime = Date.now();
    const deltaTime = selectedUnixTime - currentTime;
    if (currentTime < selectedUnixTime) {
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      refs.daysValue.textContent = `${addLeadingZero(days)}`;
      refs.hoursValue.textContent = `${addLeadingZero(hours)}`;
      refs.minutessValue.textContent = `${addLeadingZero(minutes)}`;
      refs.secondsValue.textContent = `${addLeadingZero(seconds)}`;
      // console.log(convertMs(deltaTime));
    }
  }, 1000);
}

// ================== convert time ==================
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// ================== make string with "0" on start ==================

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
