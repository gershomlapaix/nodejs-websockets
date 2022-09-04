import {io} from 'socket.io'

io((3000))

io.on('connection', socket=>{
    console.log(socket.id);
})