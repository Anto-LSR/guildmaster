import { Controller } from '@nestjs/common';
import { AffixesService } from './affixes.service';

@Controller('affixes')
export class AffixesController {
  constructor(private readonly affixesService: AffixesService) {}
}
