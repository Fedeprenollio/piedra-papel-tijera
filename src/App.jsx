/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import './App.css'
import { resetGameToStorage, saveSettingToStorage } from './logic/storage'
import { useElements } from './hooks/useElements'
import { useSetting } from './hooks/useSetting'
import { useGetResult } from './hooks/useGetResult'
import { useGetElementsFromLS } from './hooks/useGetElementsFromLS'
import { Setting } from './components/Setting'
import { ScoreBoard } from './components/ScoreBoard'
import { Insctructions } from './components/Insctructions'
import ScoreMoves from './components/ScoreMoves'
import { IconAtom } from './elements/Icons'
export const WINNER_PLAYER1_COMBOS = [
  'al', // piedra a tijera
  'sj', // papel a piedra
  'dk', // tijera a papel
  'zm', // Lagarto vence a spock
  'an', // piedra aplasta a lagarto,
  'xl', // Spock rompe a tijera
  'dn', // tijera decapita a lagarto
  'zk', // lagarto devora a papel,
  'sm', //  papel desautoriza a Spock,
  'xj' // Spock vaporiza a piedra,
]
export const TIE_COMBOS = ['aj', 'sk', 'dl', 'zn', 'xm']

function App () {
  const [scored, setScored] = useState({
    player1: [],
    player2: []
  })

  const [parcialResult, setParcialResult] = useState(() => {
    const resultFromLocalStorage = window.localStorage.getItem('result')
    return resultFromLocalStorage
      ? JSON.parse(resultFromLocalStorage)
      : {
          player1: 0,
          player2: 0
        }
  })
  const { setting, setSetting } = useSetting()
  const { theWinnerIs, setTheWinnerIs } = useGetResult(setting, parcialResult)
  const {

    letterPlayer1,
    letterPlayer2,
    elementPlayerOne,
    elementPlayerTwo,
    setElementPlayerOne,
    setElementPlayerTwo,
    setLetterPlayer1,
    setLetterPlayer2,
    setAllLettersPlayers
  } = useElements(theWinnerIs, setParcialResult, scored, setScored)
  // const { parcialResult, setParcialResult } = useParcialResult(letterPlayer1, letterPlayer2)

  const { setTheElementsWhitClass } = useGetElementsFromLS(
    theWinnerIs,
    setElementPlayerOne,
    setElementPlayerTwo
  )
  const [error, setError] = useState(false)

  // DEFINO EL BO (SEETING)
  const handleSetting = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const bo = formData.get('bestOf')
    const namePlayer1 = formData.get('namePlayer1')
    const namePlayer2 = formData.get('namePlayer2')
    const estiloSheldon = formData.get('estiloSheldon') === 'true'
    if (bo % 2 === 1) {
      setSetting((prevState) => ({
        ...prevState,
        bo,
        namePlayer1,
        namePlayer2,
        estiloSheldon
      }))
      setError('')
      const newSetting = {
        bo,
        namePlayer1,
        namePlayer2,
        estiloSheldon: estiloSheldon || false
      }
      saveSettingToStorage({ setting: newSetting })
    } else {
      setSetting((prevState) => prevState)
      setError('Debe ser un numero impar')
    }
  }

  const handleReset = () => {
    setTheElementsWhitClass([])
    setAllLettersPlayers({
      playerOne: [],
      playerTwo: []
    })
    setLetterPlayer1('')
    setLetterPlayer2('')
    setTheWinnerIs('')
    setElementPlayerOne([])
    setElementPlayerTwo([])
    setParcialResult({
      player1: 0,
      player2: 0
    })
    resetGameToStorage()
  }
  const LETTER_PLAYER1 = setting.estiloSheldon
    ? ['a', 's', 'd', 'z', 'x']
    : ['a', 's', 'd']
  const LETTER_PLAYER2 = setting.estiloSheldon
    ? ['j', 'k', 'l', 'n', 'm']
    : ['j', 'k', 'l']

  // LA FUNCION PARA DETECTAR LAS TECLAS DE LOS JUGADORES:
  const handleKeyDownPlayer = (e) => {
    if (theWinnerIs) return

    if (LETTER_PLAYER1.concat(...LETTER_PLAYER2).includes(e.key)) {
      if (LETTER_PLAYER1.includes(e.key)) {
        setLetterPlayer1(e.key)
        setAllLettersPlayers((prevState) => ({
          ...prevState,
          playerOne: [...prevState.playerOne, e.key]
        }))
      }

      if (LETTER_PLAYER2.includes(e.key)) {
        setLetterPlayer2(e.key)
        setAllLettersPlayers((prevState) => ({
          ...prevState,
          playerTwo: [...prevState.playerTwo, e.key]
        }))
      }
    }
  }

  return (
    <>
      <h1>Piedra-papel-tijera {setting.estiloSheldon && <IconAtom/>}</h1>
      <div className="container">
        <Insctructions setting={setting} player="p1" />
        <div className="game">
          <Setting
            setting={setting}
            handleSetting={handleSetting}
            error={error}
          />

          <ScoreBoard
            elementPlayerOne={elementPlayerOne}
            setting={setting}
            parcialResult={parcialResult}
            handleReset={handleReset}
            theWinnerIs={theWinnerIs}
          />

          <form>
            <input
              className="input-game"
              onKeyDown={handleKeyDownPlayer}
              value={letterPlayer1}
              autoFocus
              type="password"
              placeholder="El cursor debe estar aca para jugar"
              name="game"
            />

          </form>

          <ScoreMoves setScored={setScored} scored={scored} setting={setting} theWinnerIs={theWinnerIs} letterPlayer1={letterPlayer1} letterPlayer2={letterPlayer2} elementPlayerOne={elementPlayerOne} elementPlayerTwo={elementPlayerTwo}/>
        </div>

        <Insctructions setting={setting} player="p2" />
      </div>
    </>
  )
}

export default App
