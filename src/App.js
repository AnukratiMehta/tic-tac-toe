import Board from './Board';
import Info from "./Info";
import Title from './Title';
import "./css/app.css";
import { useState } from 'react';
import Footer from './Footer';

export default function App() {

    const [reset, setReset] = useState(false)

    const [winner, setWinner] = useState('')

    const resetBoard = () => {
        setReset(true)
    }

    return (
        <div className="App">

            <div className={`winner ${winner !== '' ? '' : 'shrink'}`}>

                <div className='winner-text'>{winner}</div>

                <button onClick={() => resetBoard()}>
                    Reset Board
                </button>
            </div>
            <Title />
            <div className='board-container'>
                <Board reset={reset} setReset={setReset} winner={winner}
                    setWinner={setWinner} />
            </div>
            <Info />
            <Footer />
        </div>
    )
}