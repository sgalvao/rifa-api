import Push from "pushover-notifications"
import env from "@/config/env"

export class PushOverProvider {
	connect() {
		const push = new Push({
			user: env.pushUser,
			token: env.pushOverToken,
		})
		return push
	}

	async send(params: PushOverProvider.Params) {
		const push = this.connect()

		const msg = {
			message: params.message,
			title: params.title,
			sound: "shopify",
			device: "iphone",
			priority: 1,
		}

		push.send(msg, (err) => {
			if (err) {
				throw new Error(err)
			}
		})
	}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PushOverProvider {
	export type Params = {
		title: string
		message: string
	}
}
