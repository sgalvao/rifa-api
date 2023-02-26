import { defaultFieldResolver } from "graphql";
import { ForbiddenError } from "apollo-server-express";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { UsersRepository } from "@/infra/repositories";
import { JwtProvider } from "@/infra/providers";
import { LoadUserByTokenService } from "@/domain/services";

const makeLoadUserToken = () => {
  const userRepository = new UsersRepository();
  const jwtProvider = new JwtProvider();
  const loadUserByTokenService = new LoadUserByTokenService(
    userRepository,
    jwtProvider
  );
  return loadUserByTokenService;
};

export const authDirective = (schema, directiveName) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async function (source, args, context, info) {
          const accessToken = context?.req?.headers?.["authorization"];
          // Write here your own logic to get the user from accessToken
          const user = await makeLoadUserToken().load(accessToken);
          if (!user) {
            throw new ForbiddenError("Not authorized");
          }
          return resolve(
            source,
            args,
            Object.assign(context, { userId: user.id }),
            info
          );
        };
        return fieldConfig;
      }
    },
  });
};
