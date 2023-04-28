import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './Entity/blog.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) { }

  getBlog(page: number = 1, limit: number = 10, filter?: any, sort?: any): Promise<Blog[]> {
    const skip = (page - 1) * limit;
    const query = this.blogsRepository.createQueryBuilder('blog');

    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        query.andWhere(`blog.${key} LIKE :${key}`, { [key]: `%${value}%` });
      }
    }

    if (sort) {
      for (const [key, value] of Object.entries(sort)) {
        query.orderBy(`blog.${key}`, value as "ASC" | "DESC");
      }
    }

    query.skip(skip).take(limit);
    return query.getMany();
  }

  getOneBlog(id: number): Promise<Blog | null> {
    return this.blogsRepository.findOneBy({ id });
  }

  postBlog(req: Blog): Promise<Blog> {
    return this.blogsRepository.save(req);
  }

  async updateBlog(id: number, req: Blog): Promise<Blog> {
    await this.blogsRepository.update(id, req);
    return this.blogsRepository.findOneBy({ id });
  }

  async deleteBlog(id: number): Promise<void> {
    await this.blogsRepository.delete(id);
  }

}
