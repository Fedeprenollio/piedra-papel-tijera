import { useEffect, useState } from 'react'
import { savePairsLettersPairsToStorage } from '../logic/storage'
import { TIE_COMBOS, WINNER_PLAYER1_COMBOS } from '../App'
import { getElement } from '../logic/services/getElement'
import { getResult } from '../logic/services/getResult'

export function useElements (theWinnerIs, setParcialResult, scored, setScored) {
  const [letterPlayer1, setLetterPlayer1] = useState('')
  const [letterPlayer2, setLetterPlayer2] = useState('')
  const [elementPlayerOne, setElementPlayerOne] = useState([])
  const [elementPlayerTwo, setElementPlayerTwo] = useState([])

  const [allLettersPlayers, setAllLettersPlayers] = useState(() => {
    const AllLetterAfromLocalStorage = window.localStorage.getItem('lettersPairs')
    console.log(AllLetterAfromLocalStorage)
    return AllLetterAfromLocalStorage
      ? JSON.parse(AllLetterAfromLocalStorage)
      : {
          playerOne: [],
          playerTwo: []
        }
  })
  //   const [lettersPlayers, setLettersPlayers] = useState({
  //     player1: '',
  //     player2: ''
  //   })
  useEffect(() => {
    if (theWinnerIs) return

    const lastLetterOne = allLettersPlayers.playerOne[allLettersPlayers.playerOne.length - 1]
    const lastLetterTwo = allLettersPlayers.playerTwo[allLettersPlayers.playerTwo.length - 1]

    if (letterPlayer1 && letterPlayer2) {
      const [className1, className2] = getResult(lastLetterOne, lastLetterTwo, true)
      const elementPlayer1 = getElement(lastLetterOne)

      setElementPlayerOne([{ elementPlayer1, className: className1 }, ...elementPlayerOne])
      const elementPlayer2 = getElement(lastLetterTwo)

      setElementPlayerTwo([{ elementPlayer2, className: className2 }, ...elementPlayerTwo])

      savePairsLettersPairsToStorage(allLettersPlayers)

      setLetterPlayer1('')
      setLetterPlayer2('')

      // probando: SETEO LOS NUEVOS RESUTADOS
      const isTie = TIE_COMBOS.find(combo => combo === `${letterPlayer1}${letterPlayer2}`)
      if (isTie) return

      const isWinnerPlayerOne = WINNER_PLAYER1_COMBOS.find(combo => combo === `${letterPlayer1}${letterPlayer2}`)
      if (isWinnerPlayerOne) {
        setScored(prevState => ({ ...prevState, player1: [...prevState.player1, true] }))
        setParcialResult(prevState => ({ ...prevState, player1: prevState.player1 + 1 }))
      } else {
        setScored(prevState => ({ ...prevState, player2: [...prevState.player2, true] }))
        setParcialResult(prevState => ({ ...prevState, player2: prevState.player2 + 1 }))
      }
      // fin de prueba
    }

    if (theWinnerIs) {
      setElementPlayerOne([...elementPlayerOne.slice(1)])
      setElementPlayerTwo([...elementPlayerTwo.slice(1)])
      // alert(theWinnerIs)
    }
  }, [letterPlayer1, letterPlayer2, theWinnerIs, elementPlayerOne, elementPlayerTwo, allLettersPlayers])

  return { letterPlayer1, letterPlayer2, elementPlayerOne, elementPlayerTwo, allLettersPlayers, setElementPlayerOne, setElementPlayerTwo, setLetterPlayer1, setLetterPlayer2, setAllLettersPlayers }
}
