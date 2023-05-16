import { mergeTypeDefs } from "@graphql-tools/merge"

import baseTypes from "./base"
import userTypes from "./user"
import rifaTypes from "./rifa"
import paymentTypes from "./payment"
import winnersTypes from "./winners"
import partnerTypes from "./partner"
import transactions from "./transactions"

export default mergeTypeDefs([baseTypes, userTypes, rifaTypes, paymentTypes, winnersTypes, partnerTypes, transactions])
