import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { ExternalModule } from './externals/external.module';
import { ConfigModule} from '@nestjs/config'
import { SemanticSearchService } from './service/semantic-search.service';

@Module({
  imports: [ExternalModule, ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService, SemanticSearchService],
})
export class AppModule {}
