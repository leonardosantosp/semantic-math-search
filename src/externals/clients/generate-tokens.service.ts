import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenerateEmbeddingsService } from './generate-embeddings.service';

@Injectable()
export class GenerateTokensService {
    private readonly logger = new Logger(GenerateTokensService.name);
    constructor(private readonly configService: ConfigService,
        private readonly generateEmbeddings: GenerateEmbeddingsService
    ) { }

    async generate(formula: string) {
        this.logger.log("Gerando tokens para a fórmula: ", formula)
        const apiUrl = this.configService.getOrThrow<string>('GENERATE_TOKENS_API_URL') + "api/formulas/process"
        const apiResponse = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                formula: formula
            })
        })
        const data: string[] = await apiResponse.json()
        return data
    }
}
