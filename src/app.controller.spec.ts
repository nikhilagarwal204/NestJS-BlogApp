import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
import { Blog } from './Entity/blog.entity';

describe('BlogsController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  const testPost: Blog = {
    "id": 13,
    "Name": "Nikhil Agarwal",
    "Blog": "Completed the Nestjs Blog Task, can we proceed to the next round, really interested to join the SPADES Team!"
  };

  describe('/ (POST)', () => {
    it('should create a new post', async () => {
      const response = await request(app.getHttpServer())
        .post('/')
        .send(testPost)
        .expect(201);

      expect(response.body.Blog).toEqual(testPost.Blog);
      expect(response.body.Name).toEqual(testPost.Name);
    });

    it('should return 500 if post data is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/')
        .send({
          Blog: 'This is a test post',
        })
        .expect(500);

      expect(response.body.message).toEqual("Internal server error");
    });
  });

  describe('/ (GET)', () => {
    it('should return an array of posts', async () => {
      const response = await request(app.getHttpServer())
        .get('/')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('/:id (GET)', () => {
    it('should return a post by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/${testPost.id}`)
        .expect(200);

      expect(response.body.Blog).toEqual(testPost.Blog);
      expect(response.body.Name).toEqual(testPost.Name);
    });

    it('should return 200 undefined if post is not found', async () => {
      const response = await request(app.getHttpServer())
        .get('/9999')
        .expect(200);

      expect(response.body.message).toEqual(undefined);
    });
  });

  describe('/:id (PUT)', () => {
    it('should update a post by id', async () => {
      const updatedPost: Blog = {
        ...testPost,
        Blog: 'Updated Test Post',
      };

      const response = await request(app.getHttpServer())
        .put(`/${testPost.id}`)
        .send(updatedPost)
        .expect(200);

      expect(response.body.Blog).toEqual('Updated Test Post');
      expect(response.body.Name).toEqual(testPost.Name);
    });

    it('should return 200 undefined if post is not found', async () => {
      const response = await request
        (app.getHttpServer())
        .put('/9999')
        .send(testPost)
        .expect(200);

      expect(response.body.message).toEqual(undefined);
    });
  });

  describe('/:id (DELETE)', () => {
    it('should delete a post by id', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/${testPost.id}`)
        .expect(200);

      expect(response.body.message).toEqual(undefined);
    });

    it('should return 200 undefined if post is not found', async () => {
      const response = await request(app.getHttpServer())
        .delete('/9999')
        .expect(200);

      expect(response.body.message).toEqual(undefined);
    });
  });
});
