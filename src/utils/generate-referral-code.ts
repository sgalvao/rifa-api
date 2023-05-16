import { PartnerRepository } from "@/infra/repositories/PartnerRepository"

const partnerRepository = new PartnerRepository()

export const generateReferralCode = async (): Promise<string> => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	let referralCode = ""

	for (let i = 0; i < 5; i++) {
		const randomIndex: number = Math.floor(Math.random() * characters.length)
		referralCode += characters.charAt(randomIndex)
	}
	const invalidReferral = await partnerRepository.checkReferralCode(referralCode)
	if (invalidReferral) {
		generateReferralCode()
	}
	return referralCode.toLocaleLowerCase()
}
