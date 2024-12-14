import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Worker, Router, RtpCapabilities } from 'mediasoup/node/lib/types';
import * as mediasoup from 'mediasoup';

@Injectable()
export class MediasoupService implements OnModuleInit, OnModuleDestroy {
  private worker!: Worker;
  private router!: Router;

  async onModuleInit() {
    this.worker = await mediasoup.createWorker({
      logLevel: 'warn',
      appData: { foo: 123 },
    });
    this.worker.on('died', () => {
      console.log('Meidasoup worker died');
      process.exit(1);
    });
    this.router = await this.worker.createRouter({
      mediaCodecs: [
        {
          kind: 'audio',
          mimeType: 'audio/opus',
          clockRate: 48000,
          channels: 2,
        },
        {
          kind: 'video',
          mimeType: 'video/VP8',
          clockRate: 90000,
          parameters: {
            'x-google-start-bitrate': 1000,
          },
        },
      ],
    });
  }

  getRouterCapabilities(): RtpCapabilities {
    return this.router?.rtpCapabilities;
  }

  onModuleDestroy() {
    this.worker.close();
  }
}
