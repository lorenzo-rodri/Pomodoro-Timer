// to write JavaScript code to make the app more interactive

// set our main variables
const bells = new Audio('./sounds/surprise-emote-animal-crossing.wav'); // initializing bell sound source using Audio() constructor
const startBtn = document.querySelector('.btn-start'); // initializing startBtn and session variables using document object's .querySelector()
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const session = document.querySelector('.minutes');  // selecting elements through class selectors, .btn-start and .minutes.
let myInterval; // not assigning this yet
let state = true; // defines when the application is running. if it is the timer progresses
let isPaused = false; // for pausing
let remainingSeconds = 0; // remaining seconds for resuming

const updateSeconds = () => {
	const minuteDiv = document.querySelector('.minutes');
	const secondDiv = document.querySelector('.seconds');

	remainingSeconds--; // ⬅️ use the shared variable

	let minutesLeft = Math.floor(remainingSeconds / 60);
	let secondsLeft = remainingSeconds % 60;

	secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
	minuteDiv.textContent = `${minutesLeft}`;

	if (remainingSeconds <= 0) {
		bells.play();
		clearInterval(myInterval);
		state = true;
		pauseBtn.textContent = 'Pause';
	}
}

// main app timer function
const appTimer = () => {
	const sessionAmount = Number.parseInt(session.textContent);

	if (state) {
		state = false;
		isPaused = false;
		pauseBtn.textContent = 'Pause';

		if (remainingSeconds === 0) {
			remainingSeconds = sessionAmount * 60;
		}

		bells.play();
		myInterval = setInterval(updateSeconds, 1000);
	} else {
		alert('Session has already started.');
	}
}

const checkPause = () => {
	if (!state) { // only allow pause if the timer is running
	  if (!isPaused) {
		clearInterval(myInterval);
		isPaused = true;
		pauseBtn.textContent = 'Resume';
	  } else {
		myInterval = setInterval(updateSeconds, 1000);
		isPaused = false;
		pauseBtn.textContent = 'Pause';
	  }
	}
}
  

// main
startBtn.addEventListener('click', appTimer); // adds functionality to click buttons
pauseBtn.addEventListener('click', checkPause);
resetBtn.addEventListener('click', () => {
	clearInterval(myInterval);
	document.querySelector('.minutes').textContent = '45';
	document.querySelector('.seconds').textContent = '00';
	state = true;
	isPaused = false;
	remainingSeconds = 0;
	pauseBtn.textContent = 'Pause';
  });
  