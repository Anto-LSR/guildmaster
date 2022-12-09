import { Module } from '@nestjs/common';
import { BnetInfoController } from './bnet-info.controller';
import { BnetInfoService } from './bnet-info.service';

@Module({
  controllers: [BnetInfoController],
  providers: [BnetInfoService]
})
export class BnetInfoModule {}
