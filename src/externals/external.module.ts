import { Module } from '@nestjs/common';
import { GenerateEmbeddingsService } from './clients/generate-embeddings.service';
import { GenerateTokensService } from './clients/generate-tokens.service';

@Module({
    providers: [GenerateEmbeddingsService, GenerateTokensService],
    exports: [GenerateEmbeddingsService, GenerateTokensService]
})
export class ExternalModule {}  
