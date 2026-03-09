import { Injectable, Logger } from '@nestjs/common';
import { EmbeddingStrategy } from "src/commom/interface/embedding.strategy";
import { GenerateEmbeddingsService } from "src/externals/clients/generate-embeddings.service";
import { GenerateTokensService } from "src/externals/clients/generate-tokens.service";

@Injectable()
export class TokenizedEmbeddingStrategy implements EmbeddingStrategy {
    private readonly logger = new Logger(TokenizedEmbeddingStrategy.name)
    constructor(private readonly tokenGenerator: GenerateTokensService,
        private readonly embeddingGenerator: GenerateEmbeddingsService
    ) { }

    async generateEmbedding(formula: string) {
        this.logger.log("Chamando função para gerar tokens")
        const response: any = await this.tokenGenerator.generate(formula)
        this.logger.log("Tokens gerados: ", response.tokens)

        const embeddedList = await Promise.all(
            response.tokens.map(token => this.embeddingGenerator.generate(token))
        )

        const finalEmbedding = this.weightedAverageEmbedding(embeddedList)
        this.logger.log("Final Embedding: ", finalEmbedding)
        return finalEmbedding
    }


    private weightedAverageEmbedding(
        embeddings: number[][],
        weights?: number[],
    ): number[] {
        if (!embeddings.length) {
            throw new Error('Lista de embeddings vazia');
        }

        const dimension = embeddings[0].length;

        const result = new Array(dimension).fill(0);
        const w = weights ?? new Array(embeddings.length).fill(1);

        let weightSum = 0;

        for (let i = 0; i < embeddings.length; i++) {
            const embedding = embeddings[i];
            const weight = w[i];

            weightSum += weight;

            for (let j = 0; j < dimension; j++) {
                result[j] += embedding[j] * weight;
            }
        }

        for (let j = 0; j < dimension; j++) {
            result[j] = result[j] / weightSum;
        }

        return result;
    }
}
