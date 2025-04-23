// to write JavaScript code to make the app more interactive

// set our main variables
const bells = new Audio('./sounds/surprise-emote-animal-crossing.wav'); // initializing bell sound source using Audio() constructor
const startBtn = document.querySelector('.btn-start'); // initializing startBtn and session variables using document object's .querySelector()
const session = document.querySelector('.minutes');  // selecting elements through class selectors, .btn-start and .minutes.
let myInterval; // not assigning this yet
let state = true; // defines when the application is running. if it is the timer progresses

// main app timer function
const appTimer = () => {
	const sessionAmount = Number.parseInt(session.textContent) // setting 25 to session amount
  
	if(state) {	// if state is true
	  state = false;
	  let totalSeconds = sessionAmount * 60; // convert time to seconds
	
	  bells.play()
	  const updateSeconds = () => {
		const minuteDiv = document.querySelector('.minutes'); // get minute div to update text on screen
		const secondDiv = document.querySelector('.seconds'); // get second div to update text on screen
	  
		totalSeconds--; // decrement total seconds
	  
		let minutesLeft = Math.floor(totalSeconds/60); // convert seconds to minutes
		let secondsLeft = totalSeconds % 60; // ensure seconds left is a positive int between 0 and 59
	  
		if(secondsLeft < 10) { // if less than 10 seconds left, display '0 sec' where sec is between 0 and 9
		  secondDiv.textContent = '0' + secondsLeft;
		} else {
		  secondDiv.textContent = secondsLeft;
		}
		minuteDiv.textContent = `${minutesLeft}`
		
		// when timer is 0 play bell sound, and stop timer with clearInterval()
		if(minutesLeft === 0 && secondsLeft === 0) {
		  bells.play()
		  clearInterval(myInterval);
		}
	  }
	  myInterval = setInterval(updateSeconds, 1000); // runs updateSeconds function every one second (1000ms). once myInterval reaches 0 it turns timer off
	} else {
	  alert('Session has already started.')  // if timer tries to start after session has already begun
	}

	
}

startBtn.addEventListener('click', appTimer); // adds functionality to click button
