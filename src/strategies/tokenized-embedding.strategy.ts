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

    // async generateEmbedding(formula: string) {
    //     this.logger.log("Chamando função para gerar tokens")
    //     const response: any = await this.tokenGenerator.generate(formula)

    //     const embeddedList = await Promise.all(
    //         response.tokens.map(token => this.embeddingGenerator.generate(token))
    //     )

    //     this.logger.log("Final Embedding: ", embeddedList)
    //     const finalEmbedding = this.weightedAverageEmbedding(embeddedList)
    //     return finalEmbedding
    // }

    async generateEmbedding(formula: string) {
        const response: any = await this.tokenGenerator.generate(formula);

        // const embeddedList = await Promise.all(
        //     response.tokens.map(async (token) => {
        //         const res = await this.embeddingGenerator.generate(token);
        //         // EXTRAÇÃO: Pegue apenas o array que está dentro da chave 'embedding'
        //         return res.embedding;
        //     })
        // );

        const embeddedList = await Promise.all(
            response.tokens.map(async (token) => {
                const res = await this.embeddingGenerator.generate(token);
                // IMPORTANTE: Garanta que você está pegando o array numérico
                return res.embedding || res;
            })
        );



        // Agora o embeddedList é um number[][] puro
        const finalEmbedding = this.weightedAverageEmbedding(embeddedList);

        // IMPORTANTE: Para manter a compatibilidade com o seu AppService,
        // retorne o resultado dentro de um objeto
        console.log(" ============== Final Embedding: ", finalEmbedding);
        console.log(" ============== Final Embedding dim: ", finalEmbedding.length);
        return { embedding: finalEmbedding };
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
