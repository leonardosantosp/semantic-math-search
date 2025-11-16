import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SemanticSearchMode } from 'src/commom/enums/formula-index.enum';
import { SemanticEmbeddingFactory } from 'src/facatory/semmantic-embedding.factory';

@Injectable()
export class AppService {
  
  constructor(private readonly embeddingFactory: SemanticEmbeddingFactory){}

  async getFormulaWithSemanticSearch(formula: string, mode: SemanticSearchMode ){
    try {
      const embedding = await this.embeddingFactory.createEmbedding(formula, mode)
      if(!embedding){
        throw new NotFoundException('No embedding returned')
      }
      // TODO: Consultar no elastic
    } catch (error) {
      throw error
    }
  }
}
