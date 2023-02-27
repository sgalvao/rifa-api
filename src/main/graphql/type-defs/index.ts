import { mergeTypeDefs } from "@graphql-tools/merge";

import baseTypes from "./base";
import userTypes from "./user";
import rifaTypes from "./rifa";

export default mergeTypeDefs([baseTypes, userTypes, rifaTypes]);
