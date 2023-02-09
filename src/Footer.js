import React from 'react'
import './css/footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <p>
                Built with <span className="heart">&#10084;</span> by Anukrati Mehta
            </p>
            <div className="source">
                <a target="_blank" rel='noreferrer' href='https://github.com/AnukratiMehta/tic-tac-toe'>Source code</a>
            </div>
        </div>
    )
}

export default Footer