/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import './App.css'
import { resetGameToStorage, savePairsLettersPairsToStorage, saveSettingToStorage } from './logic/storage'
import { useElements } from './hooks/useElements'
import { useSetting } from './hooks/useSetting'
import { useGetResult } from './hooks/useGetResult'
import { useGetElementsFromLS } from './hooks/useGetElementsFromLS'
import { Setting } from './components/Setting'
import { ScoreBoard } from './components/ScoreBoard'
import { Insctructions } from './components/Insctructions'
import ScoreMoves from './components/ScoreMoves'
import { IconAtom } from './elements/Icons'
import { getResult } from './logic/services/getResult'
import { getElement } from './logic/services/getElement'
import { MoodPlayers } from './components/MoodPlayers'
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
  const [input, setInput] = useState('')
  const [letterPlayer1, setLetterPlayer1] = useState('')
  const [letterPlayer2, setLetterPlayer2] = useState('')
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
    elementPlayerOne,
    elementPlayerTwo,
    setElementPlayerOne,
    setElementPlayerTwo
    // setAllLettersPlayers
  } = useElements(theWinnerIs, setParcialResult, scored, setScored, setInput, input, letterPlayer1, setLetterPlayer1, letterPlayer2, setLetterPlayer2)
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
  const getLastMatchingLetter = (array, string) => {
    const matchingLetters = [...string].filter((letter) => array.includes(letter))
    return matchingLetters[matchingLetters.length - 1]
  }

  useEffect(() => {
    if (theWinnerIs) return
    savePairsLettersPairsToStorage(allLettersPlayers)
  }, [allLettersPlayers])

  useEffect(() => {
    const newLetters = input
    const lastLetterArr1 = getLastMatchingLetter(LETTER_PLAYER1, newLetters)
    const lastLetterArr2 = getLastMatchingLetter(LETTER_PLAYER2, newLetters)
    setLetterPlayer1(lastLetterArr1)
    setLetterPlayer2(lastLetterArr2)
    if (lastLetterArr1 && lastLetterArr2) {
      // probando:
      const [className1, className2] = getResult(lastLetterArr1, lastLetterArr2, true)
      const elementPlayer1 = getElement(lastLetterArr1)

      setElementPlayerOne([{ elementPlayer1, className: className1 }, ...elementPlayerOne])
      const elementPlayer2 = getElement(lastLetterArr2)

      setElementPlayerTwo([{ elementPlayer2, className: className2 }, ...elementPlayerTwo])

      // savePairsLettersPairsToStorage(allLettersPlayers)

      // setLetterPlayer1('')
      // setLetterPlayer2('')
      setInput('')

      // probando: SETEO LOS NUEVOS RESUTADOS
      const isTie = TIE_COMBOS.find(combo => combo === `${lastLetterArr1}${lastLetterArr2}`)
      // if (isTie) return

      const isWinnerPlayerOne = WINNER_PLAYER1_COMBOS.find(combo => combo === `${lastLetterArr1}${lastLetterArr2}`)
      if (isTie) {
        setScored(prevState => prevState)
        setParcialResult(prevState => prevState)
      } else if (isWinnerPlayerOne) {
        setScored(prevState => ({ ...prevState, player1: [...prevState.player1, true] }))
        setParcialResult(prevState => ({ ...prevState, player1: prevState.player1 + 1 }))
      } else {
        setScored(prevState => ({ ...prevState, player2: [...prevState.player2, true] }))
        setParcialResult(prevState => ({ ...prevState, player2: prevState.player2 + 1 }))
      }
      // fin de prueba
      setAllLettersPlayers((prevState) => ({
        ...prevState,
        playerOne: [...prevState.playerOne, lastLetterArr1],
        playerTwo: [...prevState.playerTwo, lastLetterArr2]
      }))
    }
  }, [input, allLettersPlayers, parcialResult, letterPlayer1, letterPlayer2])

  const handleKeyDownPlayer = (e) => {
    e.preventDefault()
    if (theWinnerIs) return
    setInput(e.target.value)

    // const lettersA = arrOfLetter.filter(letter => letter.includes(LETTER_PLAYER1))
    // console.log('letras exritas', lettersA)
    // // if (LETTER_PLAYER1.concat(...LETTER_PLAYER2).includes(value)) {
    // if (LETTER_PLAYER1.includes(e.target.value)) {
    //   setLetterPlayer1(e.target.value)
    //   setAllLettersPlayers((prevState) => ({
    //     ...prevState,
    //     playerOne: [...prevState.playerOne, e.target.value]
    //   }))
    // }

    // if (LETTER_PLAYER2.includes(e.target.value)) {
    //   setLetterPlayer2(e.target.value)
    //   setAllLettersPlayers((prevState) => ({
    //     ...prevState,
    //     playerTwo: [...prevState.playerTwo, e.target.value]
    //   }))
    // }
    // }
  }

  return (
    <>
    <div className='title'>
      <h1 >Piedra-papel-tijera</h1>
      {setting.estiloSheldon && <div><IconAtom/></div> }
    </div>

      <div className="container">
        <Insctructions setting={setting} player="p1" />
        <div className="game">
          <Setting
            setting={setting}
            handleSetting={handleSetting}
            error={error}
          />

          <ScoreBoard
            allLettersPlayers={allLettersPlayers}
            setting={setting}
            parcialResult={parcialResult}
            handleReset={handleReset}
            theWinnerIs={theWinnerIs}
          />

          <form onChange={handleKeyDownPlayer}
 >
            <input
              className="input-game"
              // onKeyDown={handleKeyDownPlayer}
              // onKeyUp={handleKeyDownPlayer}
              value={input}
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
