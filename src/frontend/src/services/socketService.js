import {io} from "socket.io-client";

export const connectSocket = (sessionId) => {
    const socketUrl = `ws://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`
    const socket = io(socketUrl, {
        reconnectionDelayMax: 1000,
        query: {
            sessionId: sessionId
        },
        extraHeaders: {
            'Access-Control-Allow-Credentials': true
        },
        withCredentials: true
    })
    socket.connect();

    socket.on("connect_error", (error) => {
        console.log(error.message)
    })
    return socket;
}