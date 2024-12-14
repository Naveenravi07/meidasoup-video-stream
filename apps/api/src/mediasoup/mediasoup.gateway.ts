import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { MediasoupService } from './mediasoup.service';
import type { Socket } from "socket.io"

@WebSocketGateway(7000, { namespace: 'media', transports: ['websocket'] })
export class MediasoupGateway {
    constructor(private readonly MediasoupService: MediasoupService) { }

    @SubscribeMessage('message')
    async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: any) {
        switch (payload) {
            case 'getRTPCapabilities':
                const capabilities = this.MediasoupService.getRouterCapabilities();
                client.emit('message', {
                    type: 'getRTPCapabilities',
                    data: capabilities
                });
                break;
        }
    }
}
