import { Server } from "socket.io"

export const SocketProvider = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "*",
		},
	})

	const handleConnection = () => {
		let onlineUsers = 0

		io.on("connection", (socket) => {
			socket.on("addUserToCount", () => {
				onlineUsers++
				io.emit("userCount", onlineUsers)
				console.log(onlineUsers, "<== USERS ONLINE")
			})

			socket.on("disconnect", () => {
				if (onlineUsers === 0) {
					console.log(onlineUsers, "<== USERS Desconectou")
					return io.emit("userCount", 0)
				}
				onlineUsers--
				io.emit("userCount", onlineUsers)
				console.log(onlineUsers, "<== USERS Desconectou")
			})
		})
	}

	const handlePayment = () => {
		io.on("connection", (socket) => {
			socket.emit("payed")
		})
	}

	return { handleConnection, handlePayment }
}
