export async function getFeriadosOfTheYearByMonths(){
  const date = new Date()
  const year = date.getFullYear()
  const res = fetch(`http://nolaborables.com.ar/api/v2/feriados/${year}?formato=mensual`)
  const data = await res.json()
}