import { useState } from 'react'

export function useSetting () {
  const [setting, setSetting] = useState(() => {
    const settingFromLocalStorage = window.localStorage.getItem('setting')
    console.log(settingFromLocalStorage)
    return settingFromLocalStorage
      ? JSON.parse(settingFromLocalStorage)
      : {
          bo: 5,
          namePlayer1: 'Player 1',
          namePlayer2: 'Player 2',
          estiloSheldon: false
        }
  })
  return { setting, setSetting }
}
