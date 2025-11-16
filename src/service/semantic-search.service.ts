import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch'
import { ConfigService } from '@nestjs/config'
import { SemanticSearchMode, ElasticIndexes } from 'src/commom/enums/formula-index.enum';
@Injectable()
export class SemanticSearchService {
    constructor(private readonly configService: ConfigService, private readonly elasticClient: Client) {
        elasticClient = new Client({
            node: "https://localhost:9200",
            auth: {
                username: this.configService.getOrThrow("ELASTIC_USER"),
                password: this.configService.getOrThrow("ELASTIC_PASSWORD")
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async getFormulas (embedding: Array<number>, mode: SemanticSearchMode)  {
        const embeddingField = mode === SemanticSearchMode.DIRECT ? "embedding" : "token_embedding"
        const results = await this.elasticClient.search({
            index: ElasticIndexes[mode],
            knn: {
                field: embeddingField,
                query_vector: embedding,
                k: 3,
                num_candidates: 1000
            }
        });

        return {
            total:
            typeof results.hits.total === "number"
                ? results.hits.total
                : results.hits.total?.value || 0,
            results: results.hits.hits
        };
    };
}

