// initializing bell sound source using Audio() constructor
const bells = new Audio('./sounds/surprise-emote-animal-crossing.wav');

// stores references to important HTML elements
const startBtn = document.querySelector('.btn-start'); 
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const session = document.querySelector('.minutes');  // selecting elements through class selectors, .btn-start and .minutes.

let myInterval; // will store ID for setInterval() timer so it can be started and stopped
let state = true; // defines when the timer is running
let isPaused = false; // true if timer is paused
let remainingSeconds = 0; // tracks seconds left on timer

// Every second, this function runs to update the time
const updateSeconds = () => {

	// get latest reference from minutes adn seconds on screen
	const minuteDiv = document.querySelector('.minutes'); 
	const secondDiv = document.querySelector('.seconds'); 

	remainingSeconds--; // decrease time left by 1s

	// calculate minutes and seconds left
	let minutesLeft = Math.floor(remainingSeconds / 60);
	let secondsLeft = remainingSeconds % 60;

	// update time displayed
	secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft; // if seconds are less than 10, pad with a 0
	minuteDiv.textContent = `${minutesLeft}`;

	// when time reaches 0
	if (remainingSeconds <= 0) {
		bells.play(); // play bell
		clearInterval(myInterval); // stop countdown
		state = true; // reset run state
		pauseBtn.textContent = 'Pause'; //reset pause button to say pause not resume
	}
}

// main app timer function
const appTimer = () => {
	
	// read staring minutes from display, convert to number
	const sessionAmount = Number.parseInt(session.textContent);

	// when state is true, run the following
	if (state) {
		state = false; // set state to false (now running)
		isPaused = false; // set pause state to false (not paused)
		pauseBtn.textContent = 'Pause'; // set pause button text to pause

		// if reminging seconds is 0 (which they will be when started), take the minutes and change into seconds to count down from
		if (remainingSeconds === 0) {
			remainingSeconds = sessionAmount * 60;
		}

		bells.play(); // play bell because timer started
		myInterval = setInterval(updateSeconds, 1000); // start an interval to call update seconds every second
	} else {
		alert('Session has already started.');
	}
}

// handles pausing and resuming the timer
const checkPause = () => {
	if (!state) { // only allow pause if the timer is running
	
		// if not paused
		if (!isPaused) {
			clearInterval(myInterval); // stop timer interval
			isPaused = true; // change pause state to true
			pauseBtn.textContent = 'Resume'; // change text to resume
		
		// if already paused
		} else {
			myInterval = setInterval(updateSeconds, 1000); // resume the timer
			isPaused = false;
			pauseBtn.textContent = 'Pause';
		}
	}
}

// Event listeners (user actions)
startBtn.addEventListener('click', appTimer); // run app timer function when start is clicked
pauseBtn.addEventListener('click', checkPause); // pause when pause is clicked
resetBtn.addEventListener('click', () => { // if reset is clicked, reset everything
	clearInterval(myInterval);
	document.querySelector('.minutes').textContent = '45'; // time back to 45 minutes
	document.querySelector('.seconds').textContent = '00';
	state = true; // reset all states
	isPaused = false;
	remainingSeconds = 0;
	pauseBtn.textContent = 'Pause';
  });
  