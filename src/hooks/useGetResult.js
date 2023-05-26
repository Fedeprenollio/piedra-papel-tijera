import { useEffect, useState } from 'react'
import { saveGameToStorage } from '../logic/storage'

export function useGetResult (setting, parcialResult) {
  const [theWinnerIs, setTheWinnerIs] = useState(null)

  // DETECTO SI HAY UN GANADOR EN CADA RONDA
  useEffect(() => {
    if (parcialResult.player1 === Math.ceil((setting.bo / 2))) {
      setTheWinnerIs('El ganador es el player1')
    } else if (parcialResult.player2 === Math.ceil((setting.bo / 2))) {
      setTheWinnerIs('El ganador es el player2')
    }
    const newResult = parcialResult
    saveGameToStorage({ result: newResult })
  }, [parcialResult, setting])

  return { theWinnerIs, setTheWinnerIs }
}
