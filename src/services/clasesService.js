import { CURSO } from "../constants"
import { obtenerFechaExamenFinal } from "./feriadosService"
export async function getClasesRestantes(clase, feriados) {
    clase = Number(clase)
    if (clase > CURSO.TOTAL_CLASES || clase < 0) {
        return
    }
    const clasesRestantes = CURSO.TOTAL_CLASES - clase
    let sumaClases = 0
    let guiaActual
    for (const contenido of CURSO.CONTENIDO) {
        if (sumaClases >= clase) {
            break
        }
        sumaClases += contenido.clases
        guiaActual = contenido.guia
    }
    let clasesRestantesGuiaActual = sumaClases - clase

    const fechaARendir = await obtenerFechaExamenFinal(clasesRestantes, feriados)

    return {
        guiaActual,
        clasesRestantes,
        clasesRestantesGuiaActual,
        fechaARendir

    }
}