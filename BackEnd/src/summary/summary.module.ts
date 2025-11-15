import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SummaryController } from './summary.controller';
import  SummaryService  from './summary.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [SummaryController],
  providers: [SummaryService]
})
export class SummaryModule {}
