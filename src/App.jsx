import { useState } from 'react'
import './App.css'
import LogoEgg from './components/LogoEgg'
//https://nolaborables.com.ar/api/v2/feriados/2023
const SELECT_ACTIONS = {
  FECHA: "fecha",
  CLASE: "clase"
}


function App() {
  const [selectedOption, setSelectedOption] = useState(SELECT_ACTIONS.FECHA)

  function handleChangeSelectedOption(e) {
    setSelectedOption(e.target.value)
  }
  return (
    <>
      <header className='header'>
        <LogoEgg className="logo" />
      </header>
      <main className='main'>
        <h1>¿Cuándo finaliza mi curso?</h1>

        <select onChange={handleChangeSelectedOption} value={selectedOption}>
          <option value={SELECT_ACTIONS.FECHA}>Fecha de inicio</option>
          <option value={SELECT_ACTIONS.CLASE}>Numero de clase</option>
        </select>
        {
          selectedOption === SELECT_ACTIONS.FECHA ?
            <>
              <h3>Para calcular la fecha de exámen final ingresa el día que iniciaste el curso</h3>
              <input type="date" />
            </>
            :
            <>
              <h3>Para calcular la fecha de exámen final ingresa el numero de clase en la que estas</h3>
              <input type="number" />
            </>
        }
        <button>Calcular</button>
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/fekfcS0UhEE" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}

      </main>
    </>
  )
}

export default App
