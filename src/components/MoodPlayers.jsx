/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './MoodPlayers.css'
import { IconOneToLooser, IconOneToWinner, IconBandagedHead } from '../elements/IconMoods'

export const MoodPlayers = ({ parcialResult, setting, theWinnerIs }) => {
  const [moodIconOne, setMoodIconOne] = useState(null)
  const [moodIconTwo, setMoodIconTwo] = useState(null)
  const [matchPoint, setMatchPoint] = useState('')

  useEffect(() => {
    setMatchPoint(null)
    if (theWinnerIs) {
      setMatchPoint(<p style={{ fontSize: '50px' }} className='match-point'> OK</p>)
    } else {
      setMatchPoint('')
    }
    console.log('theWinnerIs', theWinnerIs)

    if (parcialResult.player1 > 3 && parcialResult.player2 === 0) { // 3-0
      setMoodIconOne(<IconOneToWinner />)
      setTimeout(() => {
        setMoodIconOne(null)
      }, 2000)
    } else if (Math.ceil(setting.bo / 2) - parcialResult.player1 === 1) { // Uno para ganar
      setMatchPoint(<p style={{ fontSize: '20px' }}className='match-point'> Match Point </p>)
      setMoodIconOne(<IconOneToWinner />)
      setMoodIconTwo(<IconOneToLooser />)
      setTimeout(() => {
        setMoodIconOne(null)
        setMoodIconTwo(null)
      }, 3000)
      // eslint-disable-next-line no-useless-return
      return
    }
  }, [parcialResult, theWinnerIs, setting])

  useEffect(() => {
    if (theWinnerIs) {
      // setMoodIconOne(<img className='img-ko' src="../public/ko.png" alt="" />)
      return
    }

    if (
      Math.ceil(setting.bo / 2) - parcialResult.player2 === 1 && // uno para ganar a ambos
      parcialResult.player2 === parcialResult.player1
    ) {
      setMoodIconTwo(<IconBandagedHead/>)
      setMatchPoint(<p className='match-point'> Match Point </p>)
      setMoodIconOne(<IconBandagedHead/>)
      setTimeout(() => {
        setMoodIconOne(null)
        setMoodIconTwo(null)
      }, 2000)
    } else if (parcialResult.player2 > 3 && parcialResult.player1 === 0) { // 3-0
      setMoodIconTwo(<IconOneToWinner />)
      setTimeout(() => {
        setMoodIconTwo(null)
      }, 2000)
    } else if (Math.ceil(setting.bo / 2) - parcialResult.player2 === 1) { // uno para ganar
      setMatchPoint(<p className='match-point'> Match Point </p>)
      setMoodIconTwo(<IconOneToWinner />)
      setMoodIconOne(<IconOneToLooser />)
      setTimeout(() => {
        setMoodIconOne(null)
        setMoodIconTwo(null)
      }, 2000)
    }
  }, [parcialResult, theWinnerIs, setting])

  return (
    <div style={{ display: 'flex' }}>
      <div className="container-mood">
        {moodIconOne && (
          <div className="player-one-mood mood">{moodIconOne}</div>
        )}
      </div>
          {matchPoint || null}
      <div className="container-mood">
        {moodIconOne && (
          <div className="player-two-mood mood">{moodIconTwo}</div>
        )}
      </div>
    </div>
  )
}
