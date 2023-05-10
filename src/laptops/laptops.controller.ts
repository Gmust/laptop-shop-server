import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LaptopsService } from './laptops.service';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
  FindOneByIdResponse,
  GetByNameRequest,
  GetByNameResponse,
  PaginateAndFilterResponse,
  SearchRequest,
  SearchResponse
} from './types';

@Controller('laptops')
export class LaptopsController {
  constructor(private readonly laptopsService: LaptopsService) {}

  @ApiOkResponse({ type: PaginateAndFilterResponse })
  @Get()
  paginateAndFilter(@Query() query) {
    return this.laptopsService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: FindOneByIdResponse })
  @Get('find/:id')
  findOneById(@Param('id') id: string) {
    return this.laptopsService.findOneById(id);
  }

  @ApiOkResponse({ type: GetByNameResponse })
  @ApiBody({ type: GetByNameRequest })
  @Post('name')
  findOneByName(@Body() { name }: { name: string }) {
    return this.laptopsService.findOneByName(name);
  }

  @ApiOkResponse({ type: SearchResponse })
  @ApiBody({ type: SearchRequest })
  @Post('search')
  search(@Body() { search }: { search: string }) {
    return this.laptopsService.searchByString(search);
  }

  // @ApiOkResponse({ type: GetBestsellersResponse })
  @Get('bestsellers')
  bestsellers() {
    return this.laptopsService.bestsellers();
  }

  // @ApiOkResponse({ type: GetNewResponse })
  @Get('new')
  new() {
    return this.laptopsService.new();
  }
}
