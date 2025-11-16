import { EmbeddingStrategy } from "src/commom/interface/embedding.strategy";
import { GenerateEmbeddingsService } from "src/externals/clients/generate-embeddings.service";

export class DirectEmbeddingStrategy implements EmbeddingStrategy {
    constructor(private readonly embeddingGenerator: GenerateEmbeddingsService){}

    async generateEmbedding(formula: string){
        return this.embeddingGenerator.generate(formula)
    }
}