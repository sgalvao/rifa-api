export type Rifa = {
	name: string
	price: number
	image: string
	status: string
	participants: number
	soldNumbers: number[]
	winnerNumber: number
	isFinished: boolean
	firstPrize?: number
	secondPrize?: number
	thirdPrize?: number
}
