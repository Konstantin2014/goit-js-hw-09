import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  timer: document.querySelector('.timer'),
  dateFields: document.querySelectorAll('.field'),
  timerLable: document.querySelectorAll('.label'),
  hoursValue: document.querySelector('[data-hours]'),
  minutessValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

refs.dateInput.style.padding = '10px';
refs.dateInput.style.fontSize = '30px';

refs.startButton.disabled = true;
refs.startButton.style.padding = '10px';
refs.startButton.style.fontSize = '30px';
refs.startButton.style.textAlign = 'center';

refs.timer.style.display = 'flex';
refs.timerLable.forEach(lable => {
  lable.style.display = 'block';
});

refs.dateFields.forEach(field => {
  field.style.margin = '10px';
  field.style.textTransform = 'uppercase';
  field.style.fontSize = '30px';
  field.style.textAlign = 'center';
  field.style.fontWeight = '400';
});

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
    if (currentTime > selectedUnixTime) {
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
    }
  }, 1000);
}

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
