# React Memory Game

A fun, responsive memory card game built with React. Match pairs, track turns, and challenge your memory with different difficulty levels!

## Table of Contents

- [Overview](#overview)
  - [Game Features](#game-features)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [Project Overview](#project-overview)
- [Performance & Accessibility](#performance-and-accessibility)
- [Technologies Used](#technologies-used)
- [Installation & Usage](#installation-and-usage)
- [Plans for Future Enhancements](#plans-for-future-enhancements)
- [Author](#author)

## Overview

### Game Features

The goal of the game is to match pairs of cards. Users can:

- Play the game with cards that are shuffled each time the game starts
- Click or press **Enter** or **Space** to flip cards and try to match pairs
- Track the number of moves and view the game log with player turns
- Restart the game once all pairs are matched.
- Restart midgame
- Change difficulty midgame
- Card flip and matched pair animations
- See game difficulty level display
- Responsive design for desktop, tablet, and mobile
- Visually engaging interface

### Screenshot

![Memory Game Screenshot](./react-memory-game.webp)

### Links

- Solution URL: [GitHub Repository](https://github.com/Zdravko93/react_memory_game)
- Live Site URL: [Live Demo](https://zdravko93.github.io/react_memory_game/)

## Project Overview

This project was built to practice my **React** skills, focusing on **state management** and **logic implementation**. I wanted to create a fun and interactive game that could also serve as a great learning experience for understanding how to handle dynamic data, manage state, and implement game logic in React.

## Performance & Accessibility

The React Memory Game is optimized for performance and accessibility:

- **Lighthouse Performance Score:** 100
- **Accessibility:** Fully accessible with keyboard navigation
- **Responsive Design:** Works on desktop, tablet, and mobile
- **SEO:** Meta tags and Open Graph / Twitter cards implemented

![Lighthouse report](/Lighthouse-report.png)

### Technologies Used

- `React`: Component-based UI library
- `JavaScript (ES6)`: Game logic and interactivity
- `useReducer`, `useEffect`: State management and lifecycle hooks
- `CSS Modules`: Scoped and maintainable styles

## Installation

Make sure you have Node.js v18+ installed

Follow these steps to run this project locally:

1. Clone the repo:
   ```bash
   git clone https://github.com/Zdravko93/react_memory_game.git
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

### Plans for Future Enhancements

Although the core gameplay is functional, several enhancements are planned to improve structure, usability, and scalability:

- **Global State with useContext**
  Replace multiple useState hooks with useContext to centralize state and avoid prop drilling

- **Difficulty Settings**
  Add an option for players to choose difficulty (Easy, Medium, Hard), which will dynamically adjust the number of cards and layout.

- **Improved Animations**
  Introduce smoother transitions and subtle animations for card flips, matches, and resets to enhance user engagement.

- **Scoring Feedback / Stats**
  Display accuracy, score, or performance feedback at the end of the game

## Author

Github: [Zdravko93](https://github.com/Zdravko93/react_memory_game)
Frontend Mentor: [@Zdravko93](https://www.frontendmentor.io/profile/Zdravko93)
