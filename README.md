# Pomodoro Player

A React-based productivity suite that integrates a Pomodoro timer with automated YouTube music synchronization.

---

## Demo


https://github.com/user-attachments/assets/744c8bd3-cb59-4966-8e4e-2cbac2a8e8a7


---

## Features

* **Intelligent Soundscapes:** Choose between LO-FI, Ambient, Piano, or White Noise.
* **Automated YouTube Integration:** Uses the YouTube Data API to fetch and embed a random, relevant study video based on your selection.
* **Optimized Focus Blocks:** Pre-configured for 45-minute deep-work sessions to maximize productivity.
* **Synchronized Control System:** A unified interface to start, pause, resume, or reset both the countdown timer.
* **Audio Feedback:** Includes a custom chime to signal the start of a session.

---

## Technologies Used

* **Core Framework:** React.js
* **Navigation:** React Router DOM
* **External APIs:** YouTube Data API v3 & YouTube IFrame Player API
* **State Management:** React `useState`, `useEffect`, and `useRef` for precise timer logic

---

## How It Works

1.  **Select Category:** On the **Home Page**, select your preferred background audio category.
2.  **Initialize:** The app passes your selection to the **Timer Page**, where a unique video ID is dynamically fetched.
3.  **The Session:** Clicking **Start** triggers the 45-minute countdown and automatically begins video playback.
4.  **Reset:** Choosing **Reset** sets the timer back to 45 minutes and stops the video.

---

## Getting Started

### Prerequisites
* **Node.js**
* **npm**

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/lorenzo-rodri/Pomodoro-Timer.git](https://github.com/lorenzo-rodri/Pomodoro-Timer.git)
    cd pomodoro-timer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Launch the application:**
    ```bash
    npm start
    ```
    The interface will be accessible at `http://localhost:3000`.

---

> **Note:** This project requires a valid YouTube Data API key. Ensure your key is correctly configured in `Timer.jsx` to enable video fetching.
