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
        const response: any = await this.tokenGenerator.generate(formula);

        const embeddedList = await Promise.all(
            response.tokens.map(async (token) => {
                const res = await this.embeddingGenerator.generate(token);
                // IMPORTANTE: Garanta que você está pegando o array numérico
                return res.embedding || res;
            })
        );



        // Agora o embeddedList é um number[][] puro
        const finalEmbedding = this.averageEmbedding(embeddedList);

        return { embedding: finalEmbedding };
    }


    // private weightedAverageEmbedding(
    //     embeddings: number[][],
    //     weights?: number[],
    // ): number[] {
    //     if (!embeddings.length) {
    //         throw new Error('Lista de embeddings vazia');
    //     }

    //     const dimension = embeddings[0].length;

    //     const result = new Array(dimension).fill(0);
    //     const w = weights ?? new Array(embeddings.length).fill(1);

    //     let weightSum = 0;

    //     for (let i = 0; i < embeddings.length; i++) {
    //         const embedding = embeddings[i];
    //         const weight = w[i];

    //         weightSum += weight;

    //         for (let j = 0; j < dimension; j++) {
    //             result[j] += embedding[j] * weight;
    //         }
    //     }

    //     for (let j = 0; j < dimension; j++) {
    //         result[j] = result[j] / weightSum;
    //     }

    //     return result;
    // }

    private async averageEmbedding(
        embeddings: number[][],
    ): Promise<number[]> {
        if (!embeddings.length) {
            throw new Error('Lista de embeddings vazia');
        }

        const response = await fetch(`${process.env.EMBEDDING_AVERAGE_API_URL}/aggregate/json`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body:
                JSON.stringify({
                    token_embeddings: embeddings
                })

        })

        // Extrai o JSON e tipa o retorno como number[]
        const data = await response.json() as number[];

        return data;
    }
}
