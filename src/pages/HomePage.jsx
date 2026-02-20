import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/HomePage.css";

export default function HomePage() {

	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

  	const handleMusicSelect = (term) => {
    	setSearchTerm(term); 
  	};

	const SaveSelection = () => {
		if (searchTerm) {
			navigate('/timer', { state: { searchTerm } }); // pass search term into timer page
		}
	}
  
	return (
		<div className="home-page">
			<h1>Pomodoro Player</h1>
			<div class="app-message">Select a music type</div>
			<div class="music-button-container">
				<button className="music-button" id="lofi" onClick={() => handleMusicSelect("lofi playlist for studying")}>LO-FI</button>
				<button className="music-button" id="ambient" onClick={() => handleMusicSelect("ambient music playlist for studying")}>AMBIENT</button>
				<button className="music-button" id="piano" onClick={() => handleMusicSelect("piano music playlist for studying")}>PIANO</button>
				<button className="music-button" id="white-noise" onClick={() => handleMusicSelect("white noise for studying")}>WHITE NOISE</button>
			</div>
			<div className="start-box">
				<button 
					className="start-button" 
					onClick={SaveSelection}
					style={{
						backgroundColor: searchTerm ? "#3d3dd6" : "#CCCCCC", // Blue if selected, grey otherwise
						cursor: searchTerm ? "pointer" : "not-allowed"
					}}>
					Start
				</button>
			</div>
		</div>
	);
}
