import { Body, Controller, Post } from '@nestjs/common';
import { SemanticSearchMode } from 'src/commom/enums/formula-index.enum';
import { AppService } from '../service/app.service';

@Controller('search-formula')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async getFormulaWithSemanticSearch(@Body() data: { mode: SemanticSearchMode, search_formula: string }) {
    console.log("Requisição para buscar formula: ", data.search_formula, "para o modo: ", data.mode)
    return await this.appService.getFormulaWithSemanticSearch(data.search_formula, data.mode)
  }
}
