import {
    OnGatewayConnection,
    OnGatewayDisconnect, OnGatewayInit,
    WebSocketGateway, WebSocketServer,
} from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'
import {Logger} from "@nestjs/common";
import {EmailWebsocketResponseDto} from "../dtos/email-websocket-response.dto";
import * as process from "process";

@WebSocketGateway({cors:{origin:process.env.FRONTEND_URL,credentials:true}})
export class EmailWebsocket implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
   @WebSocketServer()
   server:Server
    private readonly logger = new Logger(EmailWebsocket.name)
    handleConnection(client: Socket, ...args: any[]): any {
       const sessionId = <string>client.handshake.query.sessionId;
        client.join(sessionId);
        this.logger.log(`Client with id ${client.id} has CONNECTED and joined room ${sessionId}`)
        client.emit('message', 'CONNECTED')
   }

    handleDisconnect(client: Socket): any {
       this.logger.log(`Client with id ${client.id} has DISCONNECTED`)
   }

    sendMessage(sessionId: string, body: EmailWebsocketResponseDto, event: string) {
        const clients = this.server.sockets.adapter.rooms.get(sessionId);
        if(clients && clients.size)
        this.server.to(sessionId).emit(event, body)
   }

    afterInit(server: Server): any {
     }

}
