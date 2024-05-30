import { instrument } from '@socket.io/admin-ui'
import dotenv from 'dotenv'
import { Server } from 'socket.io'

dotenv.config({ path: './.env' })

const PORT = 4425
const io = new Server(PORT, {
	cors: {
		origin: [process.env.TEST, 'https://admin.socket.io'],
		credentials: true,
	},
})

console.log(`Server is running on port ${PORT}`)

const userIo = io.of('/user')

userIo.use((socket, next) => {
	if (socket.handshake.auth.token) {
		socket.username = getUsernameFromToken(socket.handshake.auth.token)
		next()
	} else {
		next(new Error('Please send token'))
	}
})

userIo.on('connection', socket => {
	console.log('connected to user namespace', socket.username)

	socket.on('join-room', room => {
		socket.join(room)
		console.log(`${socket.id} joined room ${room}`)
	})

	socket.on('send-message', (message, room) => {
		if (room) {
			socket.to(room).emit('receive-message', message)
		} else {
			socket.broadcast.emit('receive-message', message)
		}
	})
})

function getUsernameFromToken(token) {
	return token
}

instrument(io, {
	auth: false,
})
