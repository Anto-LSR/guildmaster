import { Module } from '@nestjs/common';
import { LinkBnetController } from './link-bnet.controller';

@Module({controllers : [LinkBnetController]})
export class LinkBnetModule {}
