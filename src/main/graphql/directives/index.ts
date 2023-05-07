import { defaultFieldResolver } from "graphql"
import { ForbiddenError } from "apollo-server-express"
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils"
import { UsersRepository } from "@/infra/repositories"
import { JwtProvider } from "@/infra/providers"
import { LoadUserByTokenService } from "@/domain/services"
import { LoadPartnerByTokenService } from "@/domain/services/load-partner-by-token"
import { PartnerRepository } from "@/infra/repositories/PartnerRepository"

const makeLoadUserToken = () => {
	const userRepository = new UsersRepository()
	const jwtProvider = new JwtProvider()
	const loadUserByTokenService = new LoadUserByTokenService(userRepository, jwtProvider)
	return loadUserByTokenService
}

const makeLoadPartnerToken = () => {
	const partnerRepository = new PartnerRepository()
	const jwtProvider = new JwtProvider()
	const loadPartnerByTokenService = new LoadPartnerByTokenService(partnerRepository, jwtProvider)
	return loadPartnerByTokenService
}

export const partnerDirective = (schema, directiveName) => {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			const partnerDirective = getDirective(schema, fieldConfig, directiveName)?.[0]
			if (partnerDirective) {
				const { resolve = defaultFieldResolver } = fieldConfig
				fieldConfig.resolve = async function (source, args, context, info) {
					const accessToken = context?.req?.headers?.["authorization"]
					const partner = await makeLoadPartnerToken().load(accessToken)
					if (!partner) {
						throw new ForbiddenError("Not authorized")
					}

					return resolve(source, args, Object.assign(context, { partnerId: partner.id }), info)
				}
				return fieldConfig
			}
		},
	})
}

export const authDirective = (schema, directiveName) => {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: (fieldConfig) => {
			const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0]
			if (authDirective) {
				const { resolve = defaultFieldResolver } = fieldConfig
				fieldConfig.resolve = async function (source, args, context, info) {
					const accessToken = context?.req?.headers?.["authorization"]
					const user = await makeLoadUserToken().load(accessToken)
					if (!user) {
						throw new ForbiddenError("Not authorized")
					}
					return resolve(source, args, Object.assign(context, { userId: user.id }), info)
				}
				return fieldConfig
			}
		},
	})
}
