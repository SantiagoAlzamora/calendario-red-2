import moment from "moment"
const dateFormat = "DD-MM-YYYY"

export async function getFeriadosOfTheYearByMonths() {


  const actualDate = moment().format(dateFormat)
  const [, , actualYear] = actualDate.split("-")


  const res = await fetch(`https://nolaborables.com.ar/api/v2/feriados/${actualYear}`)
  const data = await res.json()
  return data

}
export async function obtenerFechaExamenFinal(clasesRestantes, feriados) {
  const fechaActual = new Date();
  let fecha = new Date(fechaActual);
  let diasRestantes = clasesRestantes
  let diasFeriados = 0;

  while (diasRestantes > 0) {
    fecha.setDate(fecha.getDate() + 1);

    if (esDiaHabil(fecha) && !esFeriado(fecha, feriados)) {
      diasRestantes--;
    } else if (esDiaHabil(fecha) && esFeriado(fecha, feriados)) {
      diasFeriados++;
    }
  }

  fecha.setDate(fecha.getDate() + diasFeriados);
  console.log(fecha.getDay());

  if (fecha.getDay() !== 4) {
    do {
      fecha.setDate(fecha.getDate() + 1)
    } while (fecha.getDay() !== 4)
  } else {
    fecha.setDate(fecha.getDate() + 7)
  }

  console.log(fecha);

  const finalDate = moment(fecha).format(dateFormat);
  return finalDate;
}

function esDiaHabil(fecha) {
  const dia = fecha.getDay();
  return dia >= 1 && dia <= 4; // Lunes a jueves (1 a 4)
}
function esFeriado(fecha, feriados) {
  const feriadoEnFecha = feriados.find((feriado) => {
    return (
      feriado.dia === fecha.getDate() &&
      feriado.mes - 1 === fecha.getMonth() // Restamos 1 porque los meses en JavaScript van de 0 a 11
    );
  });

  return feriadoEnFecha !== undefined;
}
