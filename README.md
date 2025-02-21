# React Memory Game

This is a **Memory Game** built with **React**. The game challenges players to match pairs of cards, keeping track of the number of moves made and the time spent to complete the game. The game is designed to be fun and engaging while helping you sharpen your memory.

## Table of Contents

- [Overview](#overview)
  - [Game Features](#game-features)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Technologies Used](#technologies-used)
  - [Plans for Future Enhancements](#plans-for-future-enhancements)
- [Installation](#installation)
- [Author](#author)

## Overview

### Game Features

The goal of the game is to match pairs of cards. Users can:

- Play the game with cards that are shuffled each time the game starts.
- Flip cards to reveal their image and try to match pairs.
- Track the number of moves and time taken to complete the game.
- Restart the game once all pairs are matched.

### Screenshot

![Memory Game Screenshot](./react-memory-game.png)

### Links

- Solution URL: [GitHub Repository](https://github.com/Zdravko93/react_memory_game)
- Live Site URL: [Live Demo](https://zdravko93.github.io/react_memory_game/)

## My Process

This project was built to practice my **React** skills, focusing on **state management** and **logic implementation**. I wanted to create a fun and interactive game that could also serve as a great learning experience for understanding how to handle dynamic data, manage state, and implement game logic in React.

### Technologies Used

- **React**: JavaScript library for building the user interface.
- **CSS Modules**: For scoped styling and modular design.
- **useState and useEffect**: React hooks used for managing game state, card flips, and timer.
- **JavaScript**: Modern JavaScript (ES6+) for game functionality and logic.

### Plans for Future Enhancements

- **Refactor Code Using `useContext`:** Currently, the app relies on multiple `useState` hooks to manage different parts of the state, like card values, moves, and whether the cards are flipped. The plan is to refactor the state management to use `useContext` to avoid prop drilling and make the state easier to manage globally.
  
- **Improve Card Matching Logic:** Currently, the logic to handle the card matching could be optimized. Future improvements will focus on separating concerns into custom hooks for better readability and modularity.

- **Add Timer:** A timer will be added to track how long it takes to complete the game, encouraging users to improve their speed.

- **User Settings:** Allow users to choose the difficulty level (easy, medium, hard) by changing the number of cards or the layout.

- **Animations and Transitions:** Improve the user experience with smooth animations when cards are flipped or matched.

## Installation

Follow these steps to run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Zdravko93/react_memory_game.git
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit http://localhost:3000 to play the game locally

## Author
Github: [Zdravko93](https://github.com/Zdravko93?tab=repositories)
Frontend Mentor: [@Zdravko93](https://www.frontendmentor.io/profile/Zdravko93)
