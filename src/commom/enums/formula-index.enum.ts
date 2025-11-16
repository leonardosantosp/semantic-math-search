export enum SemanticSearchMode  {
  DIRECT = 'formulas_embedding',
  TOKENIZED = 'formulas_token_embedding',
}

export const ElasticIndexes = {
  [SemanticSearchMode.DIRECT]: 'formulas_embedding',
  [SemanticSearchMode.TOKENIZED]: 'formulas_token_embedding'
};