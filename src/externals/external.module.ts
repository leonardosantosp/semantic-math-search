import { Module } from '@nestjs/common';
import { GenerateEmbeddingsService } from './clients/generate-embeddings.service';
import { GenerateTokensService } from './clients/generate-tokens.service';
import { DirectEmbeddingStrategy } from 'src/strategies/direct-embedding.strategy';
import { TokenizedEmbeddingStrategy } from 'src/strategies/tokenized-embedding.strategy';

@Module({
    providers: [GenerateEmbeddingsService, GenerateTokensService, DirectEmbeddingStrategy, TokenizedEmbeddingStrategy],
    exports: [GenerateEmbeddingsService, GenerateTokensService, DirectEmbeddingStrategy, TokenizedEmbeddingStrategy]
})
export class ExternalModule { }  
