import { Module } from '@nestjs/common';
import { AffixesService } from './affixes.service';
import { AffixesController } from './affixes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affixe } from './affixe.entity';

@Module({
  controllers: [AffixesController],
  providers: [AffixesService],
  imports: [TypeOrmModule.forFeature([Affixe])],
  exports: [AffixesService],
})
export class AffixesModule {}
