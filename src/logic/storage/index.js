export const saveGameToStorage = ({ result }) => {
  window.localStorage.setItem('result', JSON.stringify(result))
}

export const saveMovesToStorageA = ({ allLetterA }) => {
  window.localStorage.setItem('moves1', JSON.stringify(allLetterA))
}

export const saveMovesToStorageB = ({ allLetterB }) => {
  window.localStorage.setItem('moves2', JSON.stringify(allLetterB))
}

export const saveSettingToStorage = ({ setting }) => {
  window.localStorage.setItem('setting', JSON.stringify(setting))
}

export const savePairsLettersPairsToStorage = (pairs) => {
  window.localStorage.setItem('lettersPairs', JSON.stringify(pairs))
}

export const resetGameToStorage = () => {
  window.localStorage.removeItem('result')
  window.localStorage.removeItem('moves1')
  window.localStorage.removeItem('moves2')
  window.localStorage.removeItem('setting')
  window.localStorage.removeItem('lettersPairs')
}
