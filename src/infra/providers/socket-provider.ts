import { Server } from "socket.io"

export const SocketProvider = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "*",
		},
	})
	let onlineUsers = 0

	io.on("connection", (socket) => {
		onlineUsers++
		io.emit("userCount", onlineUsers)
		console.log("usuario", onlineUsers)
		socket.on("disconnect", () => {
			onlineUsers--
			console.log("Usuário desconectado. Usuários online:", onlineUsers)
			io.emit("userCount", onlineUsers)
		})
	})
}
