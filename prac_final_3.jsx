import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TetroCell } from '../styles/styledComponents';

const Tetro = function({  }) {
  const [movingPiece, setMovingPiece] = React.useState(true)
  const [movingPiecePos, setMovingPiecePos] = React.useState([0,0]) // first index represents row, second col
  const [rowCount, setRowCount] = React.useState(0);
  const [curBoard, setCurBoard] = React.useState([
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
  ]) // M means moving, S means set, C means complete row
  const movingPiecePosRef = React.useRef(movingPiece);
  const curBoardRef = React.useRef(curBoard);
  const movingPieceRef = React.useRef(movingPiece);
  React.useEffect(() => {
    // Synchronize movingPiecePos state with the ref
    movingPiecePosRef.current = movingPiecePos;
  }, [movingPiecePos]);
  
  React.useEffect(() => {
    // Synchronize curBoard state with the ref
    curBoardRef.current = curBoard;
  }, [curBoard]);

  React.useEffect(() => {
    // Synchronize curBoard state with the ref
    movingPieceRef.current = movingPiece;
  }, [movingPiece]);
  

  React.useEffect(() => {
    const interval = setInterval(() => {
      const [row, col] = movingPiecePosRef.current;
      const board = curBoardRef.current;
  
      if (movingPieceRef.current) {
        // Check if the piece can move down
        if (row < 11 && board[row + 1][col] === '') {
          const newBoard = [...board];
          newBoard[row + 1][col] = 'M';
          newBoard[row][col] = '';
          curBoardRef.current = newBoard;
          setCurBoard(newBoard);
  
          const newPos = [row + 1, col];
          movingPiecePosRef.current = newPos;
          setMovingPiecePos(newPos);
        } else {
          // Piece reaches the bottom or collides
          const newBoard = [...board];
          newBoard[row][col] = 'S'; // Mark as settled
          
          let rowComplete = true;
          for (let i = 0; i < 10; i++) {
            if (newBoard[row][i] !== 'S') {
              rowComplete = false;
            }
          }
          if (rowComplete) {
            setRowCount(rowCount + 1)
            for (let i = 0; i < 10; i++) {
              newBoard[row][i] = 'C'
            }
          }
          curBoardRef.current = newBoard;
          setCurBoard(newBoard);
          setMovingPiece(false);
        }
      } else {
        // Spawn a new piece at the top
        const newBoard = [...board];
        if (newBoard[0][0] === '') { // Ensure the spawn position is empty
          newBoard[0][0] = 'M';
          curBoardRef.current = newBoard;
          setCurBoard(newBoard);
  
          const newPos = [0, 0];
          movingPiecePosRef.current = newPos;
          setMovingPiecePos(newPos);
          setMovingPiece(true);
        } else {
          console.log('Game Over: No space for new piece!');
          clearInterval(interval); // Stop the game logic
        }
      }
    }, 400);
  
    return () => clearInterval(interval); // Cleanup to avoid memory leaks
  }, []); // Empty dependency array ensures this effect runs only once
  
  
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      const [row, col] = movingPiecePos;

      if (event.key === 'ArrowLeft' && col > 0 && curBoard[row][col - 1] === '') {
        // Move left
        setCurBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[row][col - 1] = 'M';
          newBoard[row][col] = '';
          return newBoard;
        });
        setMovingPiecePos([row, col - 1]);
      } else if (event.key === 'ArrowRight' && col < 9 && curBoard[row][col + 1] === '') {
        // Move right
        setCurBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[row][col + 1] = 'M';
          newBoard[row][col] = '';
          return newBoard;
        });
        setMovingPiecePos([row, col + 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Cleanup the event listener
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movingPiecePos, curBoard]);



  const displayCurBoard = () => {
    return (
      <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '60vh', width: '100%', marginTop:'20px', marginLeft: '0px', marginRight:'0px', marginBottom:'100px' }}>
        {curBoard.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', flex: '1' }}>
            {row.map((cell, cellIndex) => (
              (cell === '') ? (
                <TetroCell key={`${rowIndex}-${cellIndex}`} />
              ) : (
                (cell === 'C') ? (
                <TetroCell key={`${rowIndex}-${cellIndex}`} style ={{backgroundColor: 'lightGreen'}}/>
                ) : (
                <TetroCell key={`${rowIndex}-${cellIndex}`} style ={{backgroundColor: 'red'}}/>
                )
              )
            ))}
          </div>
          
        ))}
        <h3 style={{color: 'black'}}>{rowCount}</h3>
      </div>
      
    );
  };

  return <>
        <div style={{flex:'1'}}>
            Tetro
        </div>
        {displayCurBoard()}
   
          
  </>;
};

export default Tetro
