import { Server } from 'socket.io'
import Redis from 'ioredis'

const pub = new Redis({
    host: '',
    port: 12332, 
    username: 'default',
    password: 'AVNS_sdasd'

});
const sub = new Redis({
    host: '',
    port: 12332, 
    username: 'default',
    password: 'AVNS_sdasd'

});


class SocketService {
    private _io: Server
    constructor() {
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*',
            },
        })
        sub.subscribe('MESSAGES')

    }

    public initListners() {
        const io = this.io;
        console.log('Init socket listeners...');
        
        io.on('connect', (socket) => {
            console.log('new socket ', socket.id);

            socket.on('event:message', async ({message} : {message: string}) => {
                console.log('New Message Rec. ', message);

                await pub.publish('MESSAGES', JSON.stringify({message}));
            });
        });

        sub.on('message', (channel, message) => {
            if(channel === 'MESSAGES'){
                io.emit("message", message)
            }
        })
    }

    get io() {
        return this._io;
    }
}

export default SocketService