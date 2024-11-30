import './App.css';
import styles from './App.module.css';
import React from 'react';

function App() {
  const [grid, setGrid] = React.useState([
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-'],
  ]);

  const [colours, setColours] = React.useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [winStatus, setWinStatus] = React.useState(false);

  const [turn, setTurn] = React.useState('X');

  const winner = (i_x, i_y, j_x, j_y, k_x, k_y) => {
    const newColours = [...colours];
    newColours[i_x][i_y] = 1;
    newColours[j_x][j_y] = 1;
    newColours[k_x][k_y] = 1;
    setColours(newColours);

    let score = parseInt(localStorage.getItem(turn));
    console.log(score);
    if (isNaN(score)) {
      localStorage.setItem(turn, 1);
    } else {
      localStorage.setItem(turn, score + 1);
    }

    setWinStatus(true);
  }

  const handleClick = (x, y) => {
    if (!winStatus) {
      const newGrid = [...grid];
      newGrid[x][y] = turn;
      setGrid(newGrid);
    }
  }

  React.useEffect(() => {
    if (grid[0][0] === turn && grid[0][1] === turn && grid[0][2] === turn) {
      winner(0, 0, 0, 1, 0, 2);
    } else if (grid[1][0] === turn && grid[1][1] === turn && grid[1][2] === turn) {
      winner(1, 0, 1, 1, 1, 2);
    } else if (grid[2][0] === turn && grid[2][1] === turn && grid[2][2] === turn) {
      winner(2, 0, 2, 1, 2, 2);
    } else if (grid[0][0] === turn && grid[1][0] === turn && grid[2][0] === turn) {
      winner(0, 0, 1, 0, 2, 0);
    } else if (grid[0][1] === turn && grid[1][1] === turn && grid[2][1] === turn) {
      winner(0, 1, 1, 1, 2, 1);
    } else if (grid[0][2] === turn && grid[1][2] === turn && grid[2][2] === turn) {
      winner(0, 2, 1, 2, 2, 2);
    } else if (grid[0][0] === turn && grid[1][1] === turn && grid[2][2] === turn) {
      winner(0, 0, 1, 1, 2, 2);
    } else if (grid[0][2] === turn && grid[1][1] === turn && grid[2][0] === turn) {
      winner(0, 2, 1, 1, 2, 0);
    } else {
      if (turn === 'X') {
        setTurn('O');
      } else if (turn === 'O') {
        setTurn('X');
      }
    }
  }, [grid]);
  
  return (
    <div>
      <div class={styles.container}>
        <div onClick={() => handleClick(0, 0)} class={styles.item} style={{ backgroundColor: colours[0][0] === 1 ? 'lightgreen' : 'white' }} >{grid[0][0]}</div>
        <div onClick={() => handleClick(0, 1)} class={styles.item} style={{ backgroundColor: colours[0][1] === 1 ? 'lightgreen' : 'white' }} >{grid[0][1]}</div>
        <div onClick={() => handleClick(0, 2)} class={styles.item} style={{ backgroundColor: colours[0][2] === 1 ? 'lightgreen' : 'white' }} >{grid[0][2]}</div>
        <div onClick={() => handleClick(1, 0)} class={styles.item} style={{ backgroundColor: colours[1][0] === 1 ? 'lightgreen' : 'white' }} >{grid[1][0]}</div>
        <div onClick={() => handleClick(1, 1)} class={styles.item} style={{ backgroundColor: colours[1][1] === 1 ? 'lightgreen' : 'white' }} >{grid[1][1]}</div>
        <div onClick={() => handleClick(1, 2)} class={styles.item} style={{ backgroundColor: colours[1][2] === 1 ? 'lightgreen' : 'white' }} >{grid[1][2]}</div>
        <div onClick={() => handleClick(2, 0)} class={styles.item} style={{ backgroundColor: colours[2][0] === 1 ? 'lightgreen' : 'white' }} >{grid[2][0]}</div>
        <div onClick={() => handleClick(2, 1)} class={styles.item} style={{ backgroundColor: colours[2][1] === 1 ? 'lightgreen' : 'white' }} >{grid[2][1]}</div>
        <div onClick={() => handleClick(2, 2)} class={styles.item} style={{ backgroundColor: colours[2][2] === 1 ? 'lightgreen' : 'white' }} >{grid[2][2]}</div>
      </div>
      {winStatus === true ? <div class={styles.winner}>Win player: {turn}</div> : ''}
    </div>
  );
}

export default App;
