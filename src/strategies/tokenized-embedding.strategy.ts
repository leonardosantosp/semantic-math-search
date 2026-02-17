import { Injectable } from '@nestjs/common';
import { EmbeddingStrategy } from "src/commom/interface/embedding.strategy";
import { GenerateEmbeddingsService } from "src/externals/clients/generate-embeddings.service";
import { GenerateTokensService } from "src/externals/clients/generate-tokens.service";

@Injectable()
export class TokenizedEmbeddingStrategy implements EmbeddingStrategy {
    constructor(private readonly tokenGenerator: GenerateTokensService,
        private readonly embeddingGenerator: GenerateEmbeddingsService
    ) { }

    async generateEmbedding(formula: string) {
        const tokens = await this.tokenGenerator.generate(formula)
        return await this.embeddingGenerator.generate(tokens)
    }
}