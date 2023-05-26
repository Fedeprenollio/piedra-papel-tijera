import { useEffect, useState } from 'react'
import { getElement } from '../logic/services/getElement'
import { getResult } from '../logic/services/getResult'

export function useGetElementsFromLS (theWinnerIs, setElementPlayerOne, setElementPlayerTwo) {
  function incialStateFromLocalStorage () {
    const elementsFromsLocalStorageA = window.localStorage.getItem('lettersPairs')
    if (elementsFromsLocalStorageA) {
      const objeto = JSON.parse(elementsFromsLocalStorageA)
      const result = objeto?.playerOne?.map((value, index) => value + objeto.playerTwo[index])

      return result
    }
  }

  const [theElementsWhitClass, setTheElementsWhitClass] = useState(() => incialStateFromLocalStorage() || [])
  useEffect(() => {
    // solo para recuerar las jugadas del LS si es que existe
    if (theElementsWhitClass.length > 0) {
      if (theWinnerIs) return
      theElementsWhitClass.map(el => {
        const [className1, className2] = getResult(el[0], el[1], false)
        const elementPlayer1 = getElement(el[0])
        const elementPlayer2 = getElement(el[1])
        setElementPlayerOne(prevState => [{ elementPlayer1, className: className1 }, ...prevState])

        setElementPlayerTwo(prevState => [{ elementPlayer2, className: className2 }, ...prevState])
      })
    }
  }, [theElementsWhitClass, theWinnerIs])
  return { theElementsWhitClass, setTheElementsWhitClass }
}
