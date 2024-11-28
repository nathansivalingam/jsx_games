import './App.css';
import React from 'react';

function App() {
  const [winStatus, setWinStatus] = React.useState(false);
  const [turn, setTurn] = React.useState('X');
  const [grid, setGrid] = React.useState(['-', '-', '-', '-', '-', '-', '-', '-', '-']);
  const [colours, setColours] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const playerMove = (item) => {
    // Set the value of the new item
    if (grid[item] === '-') {
      const newGrid = [...grid];
      newGrid[item] = turn;
      setGrid(newGrid);
    }
  }

  const changeColour = (itemI, itemJ, itemK) => {
    const newColours = [...colours];
    newColours[itemI] = 1;
    newColours[itemJ] = 1;
    newColours[itemK] = 1;
    setColours(newColours);
    setWinStatus(true);
    // Get the current number of wins
    // Update them
    let curWins = localStorage.getItem(turn);
    if (curWins === null) {
      curWins = 1;
    } else {
      curWins = parseInt(curWins) + 1
    }
    console.log(curWins);
    localStorage.setItem(turn, curWins);
  }

  React.useEffect(() => {
    if (grid[0] === turn && grid[1] === turn && grid[2] === turn) {
      changeColour(0, 1, 2);
    } else if (grid[3] === turn && grid[4] === turn && grid[5] === turn) {
      changeColour(3, 4, 5);
    } else if  (grid[6] === turn && grid[7] === turn && grid[8] === turn) {
      changeColour(6, 7, 8);
    } else if (grid[0] === turn && grid[3] === turn && grid[6] === turn) {
      changeColour(0, 3, 6);
    } else if (grid[1] === turn && grid[4] === turn && grid[7] === turn) {
      changeColour(1, 4, 7);
    } else if (grid[2] === turn && grid[5] === turn && grid[8] === turn) {
      changeColour(2, 5, 8);
    } else if (grid[0] === turn && grid[4] === turn && grid[8] === turn) {
      changeColour(0, 4, 8);
    } else if (grid[2] === turn && grid[4] === turn && grid[6] === turn) {
      changeColour(2, 4, 6);
    } else {
      // Change who's turn it is
      if (turn === 'X') {
        setTurn('O');
      } else {
        setTurn('X');
      }
    }
  }, [grid])

  return (
    <div>
      <div class="container">
        <button onClick={() => playerMove(0)} class="item item-1" style={{ backgroundColor: colours[0] === 1 ? 'lightgreen' : 'white' }}>{grid[0]}</button>
        <button onClick={() => playerMove(1)} class="item item-2" style={{ backgroundColor: colours[1] === 1 ? 'lightgreen' : 'white' }}>{grid[1]}</button>
        <button onClick={() => playerMove(2)} class="item item-3" style={{ backgroundColor: colours[2] === 1 ? 'lightgreen' : 'white' }}>{grid[2]}</button>
        <button onClick={() => playerMove(3)} class="item item-4" style={{ backgroundColor: colours[3] === 1 ? 'lightgreen' : 'white' }}>{grid[3]}</button>
        <button onClick={() => playerMove(4)} class="item item-5" style={{ backgroundColor: colours[4] === 1 ? 'lightgreen' : 'white' }}>{grid[4]}</button>
        <button onClick={() => playerMove(5)} class="item item-6" style={{ backgroundColor: colours[5] === 1 ? 'lightgreen' : 'white' }}>{grid[5]}</button>
        <button onClick={() => playerMove(6)} class="item item-7" style={{ backgroundColor: colours[6] === 1 ? 'lightgreen' : 'white' }}>{grid[6]}</button>
        <button onClick={() => playerMove(7)} class="item item-8" style={{ backgroundColor: colours[7] === 1 ? 'lightgreen' : 'white' }}>{grid[7]}</button>
        <button onClick={() => playerMove(8)} class="item item-9" style={{ backgroundColor: colours[8] === 1 ? 'lightgreen' : 'white' }}>{grid[8]}</button>
      </div>
      {winStatus === true ? (
        <div id="win">Win player: {turn}</div>
      ) : '' }
    </div>
  );
}

export default App;
