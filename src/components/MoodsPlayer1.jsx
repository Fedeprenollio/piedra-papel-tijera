/* eslint-disable react/prop-types */
import React from 'react'
import { IconBandagedHead, IconEyesToUp, IconFaceWithStuckOutTongueAnd, IconOneToLooser, IconOneToWinner } from '../elements/IconMoods'

export const MoodsPlayer1 = ({ parcialResult }) => {
  console.log(parcialResult.player2,  parcialResult.player1 === 2)
  if (parcialResult.player2 === 2 && parcialResult.player1 === 0) {
    if (parcialResult.player2 === 2 && parcialResult.player1 === 1) {
      if (parcialResult.player2 === 2 && parcialResult.player1 === 2) {
        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div><IconBandagedHead/></div>
              <div><IconFaceWithStuckOutTongueAnd/></div>
            </div>
        )
      }
      return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div><IconBandagedHead/></div>
         <div><IconEyesToUp/></div>
        </div>
      )
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div><IconOneToLooser/></div>
         <div><IconOneToWinner/></div>
      </div>

    )
  } else return null
}
