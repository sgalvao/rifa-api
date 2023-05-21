import { prisma } from "../config/prisma-client"

function unirVetores(vetores: number[][]): number[] {
	return vetores.reduce((resultado, vetor) => resultado.concat(vetor), [])
}
function numerosRepetidos(vetor: number[]): number[] {
	const numerosSet = new Set<number>()
	const numerosRepetidos: number[] = []

	for (const numero of vetor) {
		if (numerosSet.has(numero) && !numerosRepetidos.includes(numero)) {
			numerosRepetidos.push(numero)
		}
		numerosSet.add(numero)
	}

	return numerosRepetidos
}

const handleValidate = async () => {
	const soldNumbers = await prisma.rifa.findMany()

	const numbers = await prisma.paymentIntent.findMany({ where: { status: "approved" } })

	const realSoldNumbers = numbers.map((item) => item.numbers)

	console.log("NUMEROS VENDIDOS", numerosRepetidos(unirVetores(realSoldNumbers)).length)
}

handleValidate()
