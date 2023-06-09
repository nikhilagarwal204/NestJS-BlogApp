import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Blog } from './Entity/blog.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { HttpException, HttpStatus, BadRequestException } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getBlog(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filter') filter?: string,
    @Query('sort') sort?: string,
  ): Promise<Blog[]> {
    let filterObj;
    if (filter) {
      try {
        filterObj = JSON.parse(filter);
      } catch (e) {
        throw new BadRequestException('Invalid filter format');
      }
    }

    let sortObj;
    if (sort) {
      try {
        sortObj = JSON.parse(sort);
      } catch (e) {
        throw new BadRequestException('Invalid sort format');
      }
    }

    return this.appService.getBlog(page, limit, filterObj, sortObj);
  }

  @Get(':id')
  getOneBlog(@Param('id') id: number): Promise<Blog> {
    return this.appService.getOneBlog(id);
  }

  @Post()
  async postBlog(@Body() request: CreatePostDto): Promise<Blog> {
    const post = plainToClass(Blog, request);
    const errors = await validate(post);
    if (errors.length > 0) {
      throw new HttpException({ message: 'Input Blog data validation failed', errors }, HttpStatus.BAD_REQUEST);
    }
    return this.appService.postBlog(request);
  }

  @Put(':id')
  async updateBlog(@Param('id') id: number, @Body() request: UpdatePostDto): Promise<Blog> {
    const post = plainToClass(Blog, request);
    const errors = await validate(post);
    if (errors.length > 0) {
      throw new HttpException({ message: 'Input Blog data validation failed', errors }, HttpStatus.BAD_REQUEST);
    }
    return this.appService.updateBlog(id, request);
  }

  @Delete(':id')
  deleteBlog(@Param('id') id: number): Promise<void> {
    return this.appService.deleteBlog(id);
  }
}
