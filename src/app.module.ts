import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './Entity/blog.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'manny.db.elephantsql.com',
      port: 5432,
      username: 'jojxvsra',
      password: '8jBT5tkLaiD33bDenvTRhHmWmY8QnNvu',
      database: 'jojxvsra',
      entities: [Blog],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Blog])
  ],
  controllers: [AppController],
  providers: [AppService, CreatePostDto, UpdatePostDto],
})
export class AppModule {}
