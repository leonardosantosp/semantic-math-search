import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GenerateEmbeddingsService {
    private readonly logger = new Logger(GenerateEmbeddingsService.name)
    constructor(private readonly configService: ConfigService
    ) { }

    async generate(formulaToSearch: string) {
        this.logger.log("Gerando embeddins para a fórmula: ", formulaToSearch)
        const apiUrl = this.configService.getOrThrow<string>('GENERATE_EMBEDDINGS_API_URL') + "/embed"
        try {
            const apiResponse = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body:
                    JSON.stringify({
                        text: formulaToSearch
                    })

            })

            const data = await apiResponse.json()
            return data
        } catch (error) {
            throw error;
        }
    }

}
