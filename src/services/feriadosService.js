import moment from "moment"
const dateFormat = "DD-MM-YYYY"

export async function getFeriadosOfTheYearByMonths() {


  const actualDate = moment().format(dateFormat)
  const [,,actualYear] = actualDate.split("-")


  const res = await fetch(`https://nolaborables.com.ar/api/v2/feriados/${actualYear}`)
  const data = await res.json()
  return data

}

export async function obetenerCantidadFeriados(clasesRestantes, feriados) {
  let cantidadDiasTotal = (clasesRestantes / 4) * 7

  const fechaActual = new Date()
  const fecha = new Date(fechaActual)
  fecha.setDate(fecha.getDate() + cantidadDiasTotal)

  const feriadosFiltrados = feriados.filter((feriado) => {
    const fechaFeriado = new Date(
      fechaActual.getFullYear(),
      feriado.mes - 1, // Restamos 1 porque los meses en JavaScript van de 0 a 11
      feriado.dia
    );
    return (
      fechaFeriado < fecha && fechaFeriado > fechaActual && // Feriado posterior a la fecha actual
      esDiaHabil(fechaFeriado)  // Aún quedan clases restantes
    );
  });
  const cantidadFeriados = feriadosFiltrados.length
  fecha.setDate(fecha.getDate() + cantidadFeriados)
  if (fecha.getDay() >= 4) {
    fecha.setDate(fecha.getDate() + (7 - (fecha.getDay() - 4)))
  }
  const finalDate = moment(fecha.toLocaleDateString()).format(dateFormat)
  return finalDate
}



function esDiaHabil(fecha) {
  const dia = fecha.getDay();
  return dia >= 1 && dia <= 4; // Lunes a jueves (1 a 4)
}
