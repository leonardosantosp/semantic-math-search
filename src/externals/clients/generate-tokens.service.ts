import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenerateEmbeddingsService } from './generate-embeddings.service';
import { TokenResponse } from '../interfaces/token-response';

@Injectable()
export class GenerateTokensService {
    private readonly logger = new Logger()
    constructor(private readonly configService: ConfigService,
        private readonly generateEmbeddings: GenerateEmbeddingsService
        
     ){}

    async generate(formula: string){
        this.logger.log("Gerando tokens para a fórmula: ", formula)
        const apiUrl = this.configService.getOrThrow<string>('GENERATE_TOKENS_API_URL')
        const apiResponse = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                formula: formula
            })
        })
        const data: TokenResponse = await apiResponse.json()
        const tokens = data.token

        return await this.generateEmbeddings.generate(tokens)
    }   
}
