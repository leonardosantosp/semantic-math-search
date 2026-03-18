import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch'
import { ConfigService } from '@nestjs/config'
import { SemanticSearchMode, ElasticIndexes } from 'src/commom/enums/formula-index.enum';
@Injectable()
export class SemanticSearchService {

    private readonly elasticClient: Client
    constructor(private readonly configService: ConfigService) {
        this.elasticClient = new Client({
            node: "https://localhost:9200",
            auth: {
                username: this.configService.getOrThrow("ELASTIC_USER"),
                password: this.configService.getOrThrow("ELASTIC_PASSWORD")
            },
            tls: {
                rejectUnauthorized: false
            },
        });
    }

    async getFormulas(embedding: any, mode: SemanticSearchMode): Promise<any[]> {
        const embeddingField = mode === SemanticSearchMode.DIRECT ? "embedding" : "token_embedding"
        const semanticSearchQuery = {
            knn: {
                field: embeddingField, // Campo onde os embeddings estão armazenados
                query_vector: embedding.embedding,
                k: 3, // Número de resultados
                num_candidates: 100 // Número de candidatos a considerar
            }
        };

        const results = await this.elasticClient.search({
            index: ElasticIndexes[mode],
            body: {
                knn: semanticSearchQuery.knn
            }
        } as any);

        return results.hits.hits
    };

    
}

