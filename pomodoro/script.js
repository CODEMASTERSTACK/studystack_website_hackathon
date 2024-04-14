let focusButton = document.getElementById('focus');
let buttons = document.querySelectorAll('.btn');
let shortBreakButton = document.getElementById('shortbreak');
let longBreakButton = document.getElementById('longbreak');
let startBtn = document.getElementById('btn-start');
let reset = document.getElementById('btn-reset');
let pause = document.getElementById('btn-pause');
let time = document.getElementById('time');
let set;
let active = 'focus';
let count = 59;
let paused = true;
let minCount = 24;
let focusTime = 24;
time.textContent = `${minCount + 1}:00`;
let LongbreakTime = 14;
let ShortbreakTime = 4;
const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

const focusTimeInput = document.querySelector('#focusTime');
const ShortbreakTimeInput = document.querySelector('#ShortbreakTime');
const LongbreakTimeInput = document.querySelector('#LongbreakTime');

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  // localStorage.setItem('minCount', focusTimeInput.value);
  // localStorage.setItem('breakTime', breakTimeInput.value);
  focusTime = focusTimeInput.value - 1;
  ShortbreakTime = ShortbreakTimeInput.value - 1;
  LongbreakTime = LongbreakTimeInput.value - 1;
});

reset.addEventListener(
  'click',
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case 'long':
        if (LongbreakTime == 0 || LongbreakTime < 0) {
          minCount = 14;
        } else minCount = LongbreakTime;
        break;
      case 'short':
        if (ShortbreakTime == 0 || ShortbreakTime < 0) {
          minCount = 4;
        } else minCount = ShortbreakTime;
        break;
      case 'focus':
        if (focusTime == 0 || focusTime < 0) {
          minCount = 25;
        } else minCount = focusTime;
        break;
      default:
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove('btn-focus');
  });
};

focusButton.addEventListener('click', () => {
  removeFocus();
  focusButton.classList.add('btn-focus');
  pauseTimer();
  if (focusTime == 0 || focusTime < 0) {
    minCount = 24;
  } else minCount = focusTime;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

shortBreakButton.addEventListener('click', () => {
  active = 'short';
  removeFocus();
  shortBreakButton.classList.add('btn-focus');
  pauseTimer();
  if (ShortbreakTime == 0 || ShortbreakTime < 0 || ShortbreakTime == '') {
    minCount = 4;
  } else if (ShortbreakTime != NaN || ShortbreakTime > 0) {
    minCount = ShortbreakTime;
  }
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

longBreakButton.addEventListener('click', () => {
  active = 'long';
  removeFocus();
  longBreakButton.classList.add('btn-focus');
  pauseTimer();
  if (LongbreakTime == 0 || LongbreakTime == '' || LongbreakTime < 0) {
    minCount = 14;
  } else minCount = LongbreakTime;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener(
  'click',
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove('hide');
    pause.classList.remove('show');
    reset.classList.remove('show');
  })
);

startBtn.addEventListener('click', () => {
  reset.classList.add('show');
  pause.classList.add('show');
  startBtn.classList.add('hide');
  startBtn.classList.remove('show');
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});
