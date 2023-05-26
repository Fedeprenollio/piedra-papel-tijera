/* eslint-disable react/prop-types */
import React from 'react'

export const Setting = ({ setting, handleSetting, error }) => {
  return (
    <div className="setting">
        <h3>Setting</h3>
      <form onSubmit={handleSetting} >
        <div className="container-form-setting">

          <div className='label-setting'>
            <label htmlFor="bo">BO</label>
            <input id='bo' className='input-bo' placeholder='BO' name="bestOf" type="text" defaultValue={setting.bo} />
          </div>
          <div className='label-setting'>
            <label htmlFor="">Nombres de los jugadores</label>
            <input className='input-bo' placeholder='Nombre del player 1' name="namePlayer1" type="text" defaultValue={setting.namePlayer1} />
            <input className='input-bo' placeholder='Nombre del player 2' name="namePlayer2" type="text" defaultValue={setting.namePlayer2} />
          </div>
          <div className='label-setting'>
            <label htmlFor="myCheckBox">
              Piedra-papel-tijera estilo Sheldon Couper
            </label>
            <input id='myCheckBox' className='input-bo' name="estiloSheldon" type="checkbox" value={true} defaultChecked={setting.estiloSheldon}/>
          </div>

        </div>

        <button>Aceptar</button>
      </form>
      {error && <p>{error }</p>}

</div>
  )
}
