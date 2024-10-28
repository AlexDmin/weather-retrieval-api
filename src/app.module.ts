import { Module } from '@nestjs/common';

import { WeatherReportModule } from './infrastructure/weatherReport.module';

@Module({
  imports: [WeatherReportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
