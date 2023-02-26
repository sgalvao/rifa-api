import { mergeTypeDefs } from "@graphql-tools/merge";

import baseTypes from "./base";
import userTypes from "./user";

export default mergeTypeDefs([
  baseTypes,
  userTypes,
]);
