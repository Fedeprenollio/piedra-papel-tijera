/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { FirstElemetA, FirstElemetB } from './FirstElement'
import Confetti from 'react-confetti'
import { UpScoring } from './UpScoring'

export default function ScoreMoves ({ scored, setScored, setting, theWinnerIs, letterPlayer1, letterPlayer2, elementPlayerOne, elementPlayerTwo }) {
  return (
    <div className="parcial-results">
            <div>
              {theWinnerIs &&
              <Confetti
              confettiSource={theWinnerIs === 'El ganador es el player1' ? { x: 0, y: 0, w: window.innerWidth / 2, h: window.innerHeight / 2 } : { x: window.innerWidth / 2, y: 0, w: window.innerWidth / 2, h: window.innerHeight / 2 } }
              // width="100px"
              // height="100px"
              // gravity={0.1}
              // initialVelocityX={10}
              // initialVelocityY={10}
              // tweenDuration={4000}
              // startVelocity={15}
              particleCount={300}
            />}
              <h2 >{setting.namePlayer1}</h2>
              <UpScoring scored={scored} setScored={setScored} player="one"/>

              <div
                className={theWinnerIs ? 'player-icons' : 'player-icons first'}
              >
                <div>

                  <FirstElemetA
                    theWinnerIs={theWinnerIs}
                    letterPlayer1={letterPlayer1}
                    letterPlayer2={letterPlayer2}
                  />{' '}
                  {elementPlayerOne.map((ele, index) => (
                    <div key={index} className={ele.className}>
                      {ele.elementPlayer1}
                    </div>
                  ))}{' '}
                </div>
              </div>
            </div>
            <div>
              <h2>{setting.namePlayer2}</h2>
              <UpScoring scored={scored} setScored={setScored} player="two"/>

              <div
                className={theWinnerIs ? 'player-icons' : 'player-icons first'}
              >
                <div>
                  <FirstElemetB
                    theWinnerIs={theWinnerIs}
                    letterPlayer1={letterPlayer1}
                    letterPlayer2={letterPlayer2}
                  />{' '}
                  {elementPlayerTwo.map((ele, index) => (
                    <div key={index} className={ele.className}>
                      {ele.elementPlayer2}
                    </div>
                  ))}{' '}
                </div>
              </div>
            </div>
     </div>
  )
}
