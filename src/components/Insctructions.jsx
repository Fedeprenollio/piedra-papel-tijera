/* eslint-disable react/prop-types */
import React from 'react'
import { IconPaper, IconSissor, IconSpock, IconStone, Snake } from '../elements/Icons'

export const Insctructions = ({ setting, player }) => {
  return (
    <div className='insctructions insctructions-player1'>
    <div>
      <h4>Instrucciones</h4>
      <table>
        <thead>
          <tr>
            <th>Elemento</th>
            <th>{setting.namePlayer1}</th>

        </tr>
        </thead>
        <tbody>
          <tr>
            <td><IconStone/></td>
            <td> {player === 'p1' ? 'a' : 'j'}</td>

          </tr>
          <tr>
            <td><IconPaper/></td>
            <td>{player === 'p1' ? 's' : 'k'}</td>

          </tr>
          <tr>
            <td><IconSissor/></td>
            <td>{player === 'p1' ? 'd' : 'l'}</td>
          </tr>
          {setting.estiloSheldon &&
            <>
              <tr>
            <td><Snake/></td>
            <td>{player === 'p1' ? 'z' : 'n'}</td>

          </tr>
          <tr>
            <td><IconSpock/></td>
            <td>{player === 'p1' ? 'x' : 'm'}</td>
          </tr>
            </>
          }
      </tbody>
      </table>
    </div>
  </div>
  )
}
