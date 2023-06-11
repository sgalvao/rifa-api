import { prisma } from "@/config/prisma-client"

function unirVetoresSemRepeticao(vetor1: number[], vetor2: number[]): number[] {
	const conjunto = new Set([...vetor1, ...vetor2])
	return Array.from(conjunto)
}

function unirVetores(vetores: number[][]): number[] {
	return vetores.reduce((resultado, vetor) => resultado.concat(vetor), [])
}

const repeated = async () => {
	const soldNumbers = await prisma.rifa.findMany()
	const numbers = await prisma.paymentIntent.findMany({ where: { status: "approved" } })
}

const vetorUnido: number[] = unirVetoresSemRepeticao(vetor1, vetor2)
console.log("Vetor unido:", vetorUnido)
