/* eslint-disable react/react-in-jsx-scope */
import { IconSad, IconWait, IconWinner, IcontQuestionMark } from '../elements/Icons'
import Confetti from 'react-confetti'

/* eslint-disable react/prop-types */
export const FirstElemetB = ({ theWinnerIs, letterPlayer1, letterPlayer2 }) => {
  if (theWinnerIs === 'El ganador es el player2') {
    return (
      <div>
        <IconWinner />
      </div>
    )
  }

  if (theWinnerIs === 'El ganador es el player1') {
    return (
        <div>
        <IconSad/>
      </div>
    )
  }

  if (!letterPlayer1 && letterPlayer2) {
    return (
        <div className='container-icon-wait'>
            <IconWait/>
            <div className="text-container">
              <div className="text-wrapper">
                <span className="scrolling-text">Esperando al jugador 1</span>
              </div>
            </div>

        </div>
    )
  } else {
    return (
        <div className='container-icon-wait'>
            <IcontQuestionMark/>
            <div className="text-container">
              <div className="text-wrapper">
                <span className="scrolling-text">Selecciona tu elemento</span>
              </div>
            </div>
        </div>
    )
  }
}
export const FirstElemetA = ({ theWinnerIs, letterPlayer1, letterPlayer2 }) => {
  if (theWinnerIs === 'El ganador es el player1') {
    return (
        <div>
          <IconWinner/>
        </div>
    )
  }
  if (theWinnerIs === 'El ganador es el player2') {
    return (
        <div>
        <IconSad/>
      </div>
    )
  }

  if (letterPlayer1 && !letterPlayer2) {
    return (
        <div className='container-icon-wait'>
        <IconWait/>
        <div className="text-container">
          <div className="text-wrapper">
            <span className="scrolling-text">Esperando al jugador 2</span>
          </div>
        </div>

    </div>
    )
  } else {
    return (
        <div className='container-icon-wait'>
        <IcontQuestionMark/>
        <div className="text-container">
          <div className="text-wrapper">
            <span className="scrolling-text">Selecciona tu elemento</span>
          </div>
        </div>
    </div>
    )
  }
}
