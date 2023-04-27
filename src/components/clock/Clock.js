import { useEffect, useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './Clock.css'


/**
 * conteco de segundos
 * @param {*} segundos del state
 * @param {*} nSegundo actuales now  del sistema
 * @param {*} setSegundos function para aumentar los seg
 */
const verificaSegundo = (segundos, nSegundo, setSegundos) => {

  // cuando llegue a este valor debe volver a iniciar
  const maxSeg = 59;

  if (segundos === 0) {
    setSegundos(segundos + nSegundo + 1)
  } else if (segundos >= maxSeg) {
    setSegundos(0)
  } else {
    setSegundos(segundos + 1)
  }
}

/**
 * conteo minuts
 * @param {*} minutos del state
 * @param {*} segundos del state
 * @param {*} nMinutos actuales now del sistema
 * @param {*} setMinutos function para aumerntar min
 */
const verificaMinutos = (minutos, segundos, nMinutos, setMinutos) => {

  const maxMin = 59;

  if (minutos === 0) {
    setMinutos(minutos + nMinutos)
  } else if (segundos >= maxMin) {
    setMinutos(minutos + 1)
  } else if (minutos >= 59 && segundos >= 59) {
    setMinutos(0)
  }
}

const verificaHoras = (horas, minutos, segundos, nHoras, setHoras) => {

  if (horas === 0) {
    setHoras(horas + nHoras)
  } else if (minutos >= 60) {
    setHoras(horas + 1)
  } else if (horas >= 23 && minutos >= 59 && segundos >= 59) {
    setHoras(0)
  }
}

/**
 * recorremos el array y verificaiomos si necesita el cero o no
 * @param {*} valores array de seg min y hrs1
 * @returns boolean
 */
const verificaCeros = (valores) => {

  let MostrarCero = []

  for (var contador in valores) {

    MostrarCero[contador] = false
    if (valores[contador].toString().length === 1) {

      MostrarCero[contador] = true
    }
  }

  return MostrarCero
}


const Clock = () => {

  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [horas, setHoras] = useState(0);

  let MostrarCero;
  let today = new Date()
  let now = today.toLocaleTimeString()
  let arrNow = now.split(":");
  let nHoras = parseInt(arrNow[0])
  let nMinutos = parseInt(arrNow[1])
  const nSegundo = parseInt(arrNow[2])

  useEffect(() => {
    let time = setInterval(() => {

      verificaSegundo(segundos, nSegundo, setSegundos)
      verificaMinutos(minutos, segundos, nMinutos, setMinutos)
      verificaHoras(horas, minutos, segundos, nHoras, setHoras)

    }, 1000);

    return () => clearTimeout(time)
  }, [segundos])

  // verificamos si se necesito el cero
  MostrarCero = verificaCeros({'seg': segundos, 'min': minutos, 'hrs': horas})

  return (
    <div className='box'>
      <div className='box-time'>
        <TransitionGroup>
          <CSSTransition
            timeout={500}
            classNames="fade"
            key={horas}
          >
            <div>
              {MostrarCero['hrs'] ? '0' + horas : horas}:
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>

      <div className='box-time'>
        <TransitionGroup>
          <CSSTransition
            timeout={500}
            classNames="fade"
            key={minutos}
          >
            <div>
              {MostrarCero['min'] ? '0' + minutos: minutos}:
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>

      <div className='box-time'>
        <TransitionGroup>
          <CSSTransition
            timeout={500}
            classNames="fade"
            key={segundos}
          >
            <div>
              {MostrarCero['seg'] ? '0' + segundos : segundos}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  )
}

export default Clock