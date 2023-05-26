/* eslint-disable react/react-in-jsx-scope */
import { IconPaper, IconSissor, IconSpock, IconStone, Snake } from '../../elements/Icons'

// A PARTIR DE UNA LETRA, OBTENGO SU ICONO DEL ELEMENTO
export function getElement (letter) {
  if (letter === 'a' || letter === 'j') {
    return <IconStone/>
  } else if (letter === 's' || letter === 'k') {
    return <IconPaper/>
  } else if (letter === 'd' || letter === 'l') {
    return <IconSissor/>
  } else if (letter === 'z' || letter === 'n') {
    return <Snake/>
  } else if (letter === 'x' || letter === 'm') {
    return <IconSpock/>
  }
}
