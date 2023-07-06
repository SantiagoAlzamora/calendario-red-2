import { CURSO } from "../constants"
import { obetenerCantidadFeriados } from "./feriadosService"
export async function getClasesRestantes(clase) {

    const clasesRestantes = CURSO.TOTAL_CLASES - Number(clase)
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

    const fechaARendir = await obetenerCantidadFeriados(clasesRestantes)

    return {
        guiaActual,
        clasesRestantes,
        clasesRestantesGuiaActual,
        fechaARendir

    }
}