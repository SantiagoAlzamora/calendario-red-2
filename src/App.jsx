import { useEffect, useState } from 'react'
import './App.css'
import LogoEgg from './components/LogoEgg'
import { SELECT_ACTIONS } from './constants'
//https://nolaborables.com.ar/api/v2/feriados/2023



function App() {
  const [selectedOption, setSelectedOption] = useState(SELECT_ACTIONS.FECHA)
  const [isClicked, setIsClicked] = useState(false)
  const [feriadosProximos, setFeriadosProximos] = useState([])

  useEffect(()=>{
    
  })

  function handleSelectedOptionChange(e) {
    setSelectedOption(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    let input = {}
    if (selectedOption === SELECT_ACTIONS.FECHA) {
      input = {
        type:"date",
        stringValue :data.get('fecha').toString()
      }
    } else {
      input = {
        type:"number",
        stringValue :data.get('clase').toString()
      }
    }

    console.log(input);
  }

  return (
    <>
      <header className='header'>
        <LogoEgg className="logo" />
      </header>
      <main className='main'>
        <h1>¿Cuándo finaliza mi curso?</h1>

        <form onSubmit={handleSubmit}>
          <select onChange={handleSelectedOptionChange} value={selectedOption}>
            <option value={SELECT_ACTIONS.FECHA}>Fecha de inicio</option>
            <option value={SELECT_ACTIONS.CLASE}>Numero de clase</option>
          </select>
          {
            selectedOption === SELECT_ACTIONS.FECHA ?
              <>
                <h3>Para calcular la fecha de exámen final ingresa el día que iniciaste el curso</h3>
                <input type="date" name='fecha' />
              </>
              :
              <>
                <h3>Para calcular la fecha de exámen final ingresa el numero de clase en la que estas</h3>
                <input type="number" name='clase' />
              </>
          }
          <button className='button'>Calcular</button>
        </form>

      </main>
    </>
  )
}

export default App
