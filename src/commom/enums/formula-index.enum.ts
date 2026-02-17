export enum SemanticSearchMode {
  DIRECT = 'DIRECT',
  TOKENIZED = 'TOKENIZED'
}

export const ElasticIndexes = {
  [SemanticSearchMode.DIRECT]: 'formulas_embedding',
  [SemanticSearchMode.TOKENIZED]: 'formulas_token_embedding'
};