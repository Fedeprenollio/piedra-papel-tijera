import { TIE_COMBOS, WINNER_PLAYER1_COMBOS } from '../../App'

// OBTENGO LAS CLASES Y LOS RESULTADOS PARCIALES A PARTIR DEL PAR DE LETRAS
export function getResult (letter1, letter2, fromLocalStorage) {
  const isTie = TIE_COMBOS.find(combo => combo === `${letter1}${letter2}`)

  if (isTie) return ['tie', 'tie']

  const isWinnerPlayerOne = WINNER_PLAYER1_COMBOS.find(combo => combo === `${letter1}${letter2}`)
  if (isWinnerPlayerOne) {
    // fromLocalStorage && setParcialResult(prevState => ({ ...prevState, player1: prevState.player1 + 1 }))
    return ['win', 'los']
  } else {
    // fromLocalStorage && setParcialResult(prevState => ({ ...prevState, player2: prevState.player2 + 1 }))
    return ['los', 'win']
  }
}
