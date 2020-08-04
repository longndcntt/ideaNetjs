/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';

@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Get()
  showAllIdeas() {
    return this.ideaService.getAllIdeas();
  }

  @Get(':id')
  showIdea(@Param('id') id: string) {
    return this.ideaService.getIdea(id);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post()
  createIdea(@Body() data: IdeaDTO) {
    return this.ideaService.createIdea(data);
  }

  @Put(':id')
  updateIdea(@Param('id') id: string, @Body() data: IdeaDTO) {
    return this.ideaService.updateIdea(id, data);
  }

  @Delete(':id')
  deleteIdea(@Param('id') id: string) {
    return this.ideaService.deleteIdea(id);
  }
}
