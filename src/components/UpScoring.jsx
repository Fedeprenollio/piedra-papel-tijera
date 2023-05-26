/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import './UpScoring.css'

export const UpScoring = ({ scored, setScored, player }) => {
  useEffect(() => {
    if (scored.player1.includes(true)) {
      setTimeout(() => {
        setScored((prevSteta) => ({ ...prevSteta, player1: [] }))
      }, 2000)
    }
    if (scored.player2.includes(true)) {
      setTimeout(() => {
        setScored(prevSteta => ({ ...prevSteta, player2: [] }))
      }, 2000)
    }
  }, [scored])

  return (
    <div className='contaiener-upScoring'>
      <div className="participant one">
        { player === 'one' && scored.player1[0] && scored.player1.map((el, i) => {
          return (
            <h3 key={i} className="score one">
              +1
            </h3>
          )
        })}
      </div>

      <div className="participant two">
         { player === 'two' && scored.player2[0] && scored.player2.map((el, i) => {
           return (
            <h3 key={i} className="score two">
              +1
            </h3>
           )
         })}
      </div>
    </div>
  )
}
