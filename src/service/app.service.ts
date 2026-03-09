import { Injectable, NotFoundException } from '@nestjs/common';
import { SemanticSearchMode } from 'src/commom/enums/formula-index.enum';
import { SemanticEmbeddingFactory } from 'src/facatory/semmantic-embedding.factory';
import { SemanticSearchService } from './semantic-search.service';

@Injectable()
export class AppService {

  constructor(private readonly embeddingFactory: SemanticEmbeddingFactory, private readonly elasticService: SemanticSearchService) { }

  async getFormulaWithSemanticSearch(formula: string, mode: SemanticSearchMode) {
    try {
      console.log("Gerando embedding")
      const embedding = await this.embeddingFactory.createEmbedding(formula, mode)
      console.log("embedding", embedding)
      if (!embedding) {
        throw new NotFoundException('No embedding returned')
      }
      const results: any[] = await this.elasticService.getFormulas(embedding, mode)
      return results.map(result => ({
        score: result._score,
        formula: result._source.formula
      }))
    } catch (error) {
      throw error
    }
  }
}
