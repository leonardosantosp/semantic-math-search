import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { SemanticSearchMode } from 'src/commom/enums/formula-index.enum';

@Controller('search-formula')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getFormulaWithSemanticSearch(@Query('formula') formula: string, @Query('mode') mode: SemanticSearchMode) {
    console.log("controller", formula, mode)
    return await this.appService.getFormulaWithSemanticSearch(formula, mode)
  }
}
