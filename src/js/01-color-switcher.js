const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
  bodyStyle: document.querySelector('body'),
  allButtons: document.querySelectorAll('button'),
};

refs.startButton.addEventListener('click', onStartButton);
refs.stopButton.addEventListener('click', onStopButton);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.bodyStyle.style.justifyContent = 'center';
refs.bodyStyle.style.display = 'flex';
refs.bodyStyle.style.marginTop = '500px';

refs.allButtons.forEach(btn => {
  btn.style.fontSize = '30px';
  btn.style.textTransform = 'uppercase';
  btn.style.marginLeft = '10px';
  btn.style.padding = '20px 40px';
  btn.style.borderRadius = '5px';
  btn.style.cursor = 'pointer';
});

function onStartButton() {
  refs.stopButton.disabled = false;
  refs.startButton.disabled = 'disabled';
  refs.startButton.removeEventListener('click', onStartButton);

  timerId = setInterval(() => {
    refs.bodyStyle.style.backgroundColor = getRandomHexColor();
    console.log(timerId);
  }, 1000);
}

function onStopButton() {
  refs.startButton.disabled = false;
  refs.stopButton.disabled = true;
  refs.startButton.addEventListener('click', onStartButton);

  clearInterval(timerId);
}
