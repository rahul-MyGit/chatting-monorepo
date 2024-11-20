import { Server } from 'socket.io'

class SocketService {
    private _io: Server
    constructor() {
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*',
            },
        })
    }

    public initListners() {
        const io = this.io;
        console.log('Init socket listeners...');
        
        io.on('connect', (socket) => {
            console.log('new socket ', socket.id);

            socket.on('event:message', async ({message} : {message: string}) => {
                console.log('New Message Rec. ', message);
            });
        });
    }

    get io() {
        return this._io;
    }
}

export default SocketService