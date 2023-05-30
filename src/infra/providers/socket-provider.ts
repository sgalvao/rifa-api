import { Server } from "socket.io"

export const SocketProvider = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "*",
		},
	})
	let onlineUsers = 0

	io.on("connection", (socket) => {
		socket.on("addUserToCount", () => {
			onlineUsers++
			io.emit("userCount", onlineUsers) // Envia a contagem atualizada para todos os clientes
		})

		socket.on("disconnect", () => {
			onlineUsers--
			io.emit("userCount", onlineUsers) // Envia a contagem atualizada para todos os clientes
		})
	})
	console.log(onlineUsers, "<== USERS ONLINE")
}
