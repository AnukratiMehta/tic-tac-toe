import "./css/board.css";
import { useState, useEffect, useRef } from "react";
  
//The Board component is a functional component that takes in four props: reset, setReset, winner, and setWinner. It uses the useState hook to manage the state of the game, including the current turn (turn) and the current state of the cells on the board (data).
const Board = ({ reset, setReset, winner, setWinner }) => {
  
    const [turn, setTurn] = useState(0);
    const [data, setData] = useState(['', '', '', '', '', 
        '', '', '', ''])
  
//The boardRef variable is a ref that is attached to the div element with the board class. This ref is used to access the children elements (i.e., the cells) of the board.    
    const boardRef = useRef(null);
  
//The draw function is called when a user clicks on one of the cells. It takes in an event object and an index representing the cell that was clicked. The function checks if the cell is empty and if there is no winner yet. If both conditions are true, it updates the data array with the current player's symbol and sets the HTML content of the cell to include the current player's symbol and the appropriate class name (either x or o). Finally, it toggles the turn to the other player.
    const draw = (event, index) => {
    if (data[index - 1] === '' && winner === '') {
        const current = turn === 0 ? "X" : "O"
        data[index - 1] = current;

        // Set the HTML content of the cell to include the current player's symbol
        // and the appropriate class name
        event.target.innerHTML = `<span class="${current.toLowerCase()}">${current}</span>`;
        setTurn(turn === 0 ? 1 : 0);
    }
}

 //The useEffect hook is used to reset the board when the reset prop is set to true. It sets the data array to an array of empty strings, resets the HTML content of the cells, and sets the winner to an empty string.   
    useEffect(() => {
  
        setData(['', '', '', '', '', '', '', '', '']);
  
        const cells = boardRef.current.children
       
        for (let i = 0; i < 9; i++) {
            cells[i].innerText = '';
        }
      
        setTurn(0);
        setWinner('');
        setReset(false);
    }, [reset, setReset, setWinner])
  
  //The second useEffect hook is used to check for a win or a tie after each move. It defines three helper functions: checkRow, checkCol, and checkDiagonal, which check if there are three consecutive cells with the same symbol in a row, column, or diagonal, respectively. It also defines the checkWin function, which checks for a win by calling the three helper functions, and the checkTie function, which checks if all cells are filled. If either checkWin or checkTie returns true, the useEffect hook sets the winner state to the appropriate message.
    useEffect(() => {
  
        const checkRow = () => {
            let ans = false;
            for (let i = 0; i < 9; i += 3) {
                ans |= (data[i] === data[i + 1] && 
                data[i] === data[i + 2] && 
                data[i] !== '')
            }
            return ans;
        }
  
        const checkCol = () => {
            let ans = false;
            for (let i = 0; i < 3; i++) {
                ans |= (data[i] === data[i + 3] && 
                data[i] === data[i + 6] && 
                data[i] !== '')
            }
            return ans;
        }
  
        const checkDiagonal = () => {
            return ((data[0] === data[4] && 
            data[0] === data[8] && data[0] !== '') || 
            (data[2] === data[4] && data[2] === data[6] && 
            data[2] !== ''));
        }
  
        const checkWin = () => {
            return (checkRow() || checkCol() || checkDiagonal());
        }
  
        const checkTie = () => {
            let count = 0;
            data.forEach((cell) => {
                if (cell !== '') {
                    count++;
                }
            })
            return count === 9;
        }
  
        if (checkWin()) {
            setWinner(turn === 0 ? "Player 2 Wins!" : 
            "Player 1 Wins!");
        } else if (checkTie()) {
            setWinner("It's a Tie!");
        }
  
    })

 //The Board component returns a div element with nine child div elements representing the cells of the board. Each cell has an onClick event handler that calls the draw function with the appropriate index when clicked.   
    return (
        <div ref={boardRef} className="board">
            <div className="input input-1" 
                onClick={(e) => draw(e, 1)}></div>
            <div className="input input-2" 
                onClick={(e) => draw(e, 2)}></div>
            <div className="input input-3" 
                onClick={(e) => draw(e, 3)}></div>
            <div className="input input-4" 
                onClick={(e) => draw(e, 4)}></div>
            <div className="input input-5" 
                onClick={(e) => draw(e, 5)}></div>
            <div className="input input-6" 
                onClick={(e) => draw(e, 6)}></div>
            <div className="input input-7" 
                onClick={(e) => draw(e, 7)}></div>
            <div className="input input-8" 
                onClick={(e) => draw(e, 8)}></div>
            <div className="input input-9" 
                onClick={(e) => draw(e, 9)}></div>
        </div>
    )
}

export default Board;