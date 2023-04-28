import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './Entity/blog.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  getBlog(): Promise<Blog[]> {
    return this.blogsRepository.find();
  }

  getOneBlog(id: number): Promise<Blog | null> {
    return this.blogsRepository.findOneBy({id});
  }

  postBlog(req: Blog): Promise<Blog> {
    return this.blogsRepository.save(req);
  }

  async updateBlog(id: number, req: Blog): Promise<Blog> {
    await this.blogsRepository.update(id, req);
    return this.blogsRepository.findOneBy({id});
  }

  async deleteBlog(id: number): Promise<void> {
    await this.blogsRepository.delete(id);
  }

}
