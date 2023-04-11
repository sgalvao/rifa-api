import { mergeTypeDefs } from "@graphql-tools/merge"

import baseTypes from "./base"
import userTypes from "./user"
import rifaTypes from "./rifa"
import paymentTypes from "./payment"
import winnersTypes from "./winners"

export default mergeTypeDefs([baseTypes, userTypes, rifaTypes, paymentTypes, winnersTypes])
