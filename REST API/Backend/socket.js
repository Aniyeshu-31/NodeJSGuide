let io;

module.exports = {
    init: httpServer=>{
       io = require('socket.io')(httpServer);
       return io;
    },
    getIO: io =>
    {
        if(!io){
            throw new Error('Socket IO not Initialized!')
        }
        return io;
    }
}