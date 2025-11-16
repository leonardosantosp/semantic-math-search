import { SemanticSearchMode } from "src/commom/enums/formula-index.enum";
import { DirectEmbeddingStrategy } from "src/strategies/direct-embedding.strategy";
import { TokenizedEmbeddingStrategy } from "src/strategies/tokenized-embedding.strategy";

export class SemanticEmbeddingFactory {
    constructor(private readonly directEmbeddingGenerator: DirectEmbeddingStrategy,
        private readonly tokenizedEmbeddingGenerator: TokenizedEmbeddingStrategy
    ){}

    createEmbedding(formula: string, mode: SemanticSearchMode){
        switch(mode){
            case SemanticSearchMode.DIRECT:
                return this.directEmbeddingGenerator.generateEmbedding(formula)
            case SemanticSearchMode.TOKENIZED:
                return this.tokenizedEmbeddingGenerator.generateEmbedding(formula)
        }
    }
}