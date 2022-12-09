import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DungeonsService } from './dungeons.service';

@Controller('dungeons')
export class DungeonsController {
  constructor(private readonly dungeonsService: DungeonsService) {}
}
