import { Controller, Get, Query } from '@nestjs/common';
import { SemanticSearchMode } from 'src/commom/enums/formula-index.enum';
import { AppService } from '../service/app.service';

@Controller('search-formula')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getFormulaWithSemanticSearch(@Query('formula') formula: string, @Query('mode') mode: SemanticSearchMode) {
    console.log("Requisição para buscar formula: ", formula, "para o modo: ", mode)
    return await this.appService.getFormulaWithSemanticSearch(formula, mode)
  }
}
