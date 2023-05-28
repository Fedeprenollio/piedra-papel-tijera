/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './MoodPlayers.css'
import { IconOneToLooser, IconOneToWinner } from '../elements/IconMoods'

export const MoodPlayers = ({ parcialResult, setting, theWinnerIs }) => {
  const [moodIconOne, setMoodIconOne] = useState(null)
  const [moodIconTwo, setMoodIconTwo] = useState(null)

  useEffect(() => {
    if (theWinnerIs) return
    console.log('theWinnerIs', theWinnerIs)

    if (parcialResult.player1 > 3 && parcialResult.player2 === 0) {
      setMoodIconOne(<IconOneToWinner/>)
      setTimeout(() => {
        setMoodIconOne(null)
      }, 2000)
      return
    }

    if (Math.ceil(setting.bo / 2) - parcialResult.player1 === 1) {
      setMoodIconOne(<IconOneToWinner/>)
      setMoodIconTwo(<IconOneToLooser/>)
      setTimeout(() => {
        setMoodIconOne(null)
        setMoodIconTwo(null)
      }, 2000)
    }
  }, [parcialResult, theWinnerIs, setting])

  useEffect(() => {
    if (theWinnerIs) return
    console.log('theWinnerIs', theWinnerIs)

    if (Math.ceil(setting.bo / 2) - parcialResult.player2 === 1 && parcialResult.player2 === parcialResult.player1) {
      setMoodIconTwo('ICNO DE MIERDO')
      setMoodIconOne('MIERDO')
      setTimeout(() => {
        setMoodIconOne(null)
        setMoodIconTwo(null)
      }, 2000)
      return
    }

    if (parcialResult.player2 > 3 && parcialResult.player1 === 0) {
      setMoodIconTwo(<IconOneToWinner/>)
      setTimeout(() => {
        setMoodIconTwo(null)
      }, 2000)
      return
    }
    if (Math.ceil(setting.bo / 2) - parcialResult.player2 === 1) {
      setMoodIconTwo(<IconOneToWinner/>)
      setMoodIconOne(<IconOneToLooser/>)
      setTimeout(() => {
        setMoodIconOne(null)
        setMoodIconTwo(null)
      }, 2000)
    }
  }, [parcialResult, theWinnerIs, setting])

  return (
    <div style={{ display: 'flex' }} >
      <div className="container-mood">
            <div className="player-one-mood mood">
                    {moodIconOne}

            </div>

      </div>

      <div className="container-mood">
            <div className="player-two-mood mood">
                    {moodIconTwo}

            </div>

      </div>
    </div>
  )
}
