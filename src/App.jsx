import { useEffect, useState } from 'react'
import './App.css'
import LogoEgg from './components/LogoEgg'
import { SELECT_ACTIONS } from './constants'
import { getClasesRestantes } from './services/clasesService'
import { getFeriadosOfTheYearByMonths, obetenerCantidadFeriados } from './services/feriadosService'
//https://nolaborables.com.ar/api/v2/feriados/2023



function App() {
  const [selectedOption,] = useState(SELECT_ACTIONS.CLASE)

  const [, setFeriadosProximos] = useState([])
  const [contenido, setContenido] = useState()

  useEffect(() => {
    const getFeriados = async () => {
      const data = await getFeriadosOfTheYearByMonths()
      setFeriadosProximos(data)
    }
    getFeriados()
  })



  async function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    let input = {}
    if (selectedOption === SELECT_ACTIONS.FECHA) {
      input = {
        type: "date",
        stringValue: data.get('fecha').toString()
      }
    } else {
      input = {
        type: "number",
        stringValue: data.get('clase').toString()
      }
      setContenido(await getClasesRestantes(input.stringValue))
      await obetenerCantidadFeriados()
    }



  }

  return (
    <>
      <header className='header'>
        <LogoEgg className="logo" />
      </header>
      <main className='main'>
        <h1>¿Cuándo finaliza mi curso?</h1>

        <form onSubmit={handleSubmit}>
          {/* <select onChange={handleSelectedOptionChange} value={selectedOption}>
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
          } */}
          <h3>Para calcular la fecha de exámen final ingresa el numero de clase en la que estas</h3>
          <input type="number" name='clase' />
          <button className='button'>Calcular</button>
        </form>
        <section>
          {contenido &&
            <div className='resultado'>
              <p> Estas cursando: {contenido.guiaActual}</p>
              <p> {contenido.clasesRestantesGuiaActual > 1 ? `Te quedan ${contenido.clasesRestantesGuiaActual} dias de guia` : `Te queda ${contenido.clasesRestantesGuiaActual} dia de guia`}</p>
              <p> Clases restantes hasta test final: {contenido.clasesRestantes}</p>
              <p> Fecha de test final: {contenido.fechaARendir.get}</p>
            </div>
          }
        </section>
      </main>
    </>
  )
}

export default App
