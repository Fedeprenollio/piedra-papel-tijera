/* eslint-disable react/prop-types */
import React from 'react'

export const ScoreBoard = ({ elementPlayerOne, setting, parcialResult, handleReset, theWinnerIs }) => {
  return (

    <div className='results'>
    <h3>Resultados</h3>
    <div className="results-player">
      <div >
        <h4>{setting.namePlayer1}  </h4>
        <h5><b>{parcialResult.player1}</b></h5>
      </div>
      <div >
        <h4> {setting.namePlayer2} </h4>
        <h5><b>{parcialResult.player2}</b> </h5>
      </div>
    </div>
    {/* {elementPlayerOne?.length > 0 && elementPlayerTwo?.length > 0 && */}

      <button hidden={ elementPlayerOne.length === 0 } onClick={handleReset}> {theWinnerIs ? 'Jugar de nuevo' : 'Reiniciar el resultado' }</button>

    {theWinnerIs && <h2>{theWinnerIs}</h2>}
  </div>
  )
}
