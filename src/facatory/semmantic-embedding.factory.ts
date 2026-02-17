import { Injectable } from "@nestjs/common";
import { SemanticSearchMode } from "src/commom/enums/formula-index.enum";
import { DirectEmbeddingStrategy } from "src/strategies/direct-embedding.strategy";
import { TokenizedEmbeddingStrategy } from "src/strategies/tokenized-embedding.strategy";


@Injectable()
export class SemanticEmbeddingFactory {
    constructor(private readonly directEmbeddingGenerator: DirectEmbeddingStrategy,
        private readonly tokenizedEmbeddingGenerator: TokenizedEmbeddingStrategy
    ) { }

    createEmbedding(formula: string, mode: SemanticSearchMode) {
        console.log(mode)
        switch (mode) {
            case SemanticSearchMode.DIRECT:
                console.log("case 1")
                return this.directEmbeddingGenerator.generateEmbedding(formula)
            case SemanticSearchMode.TOKENIZED:
                console.log("case 2")
                return this.tokenizedEmbeddingGenerator.generateEmbedding(formula)

        }
    }
}