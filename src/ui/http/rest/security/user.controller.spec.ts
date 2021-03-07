import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { SecurityModule } from '../../../../infrastructure/security/security.module';
import { LoggerMock } from '../../../../infrastructure/logger/logger.mock';
import { LoggerAdapterService } from '../../../../infrastructure/logger/logger-adapter.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UserQueryRepositoryMock } from '../../../../infrastructure/security/repository/mock/user.query-repository.mock';
import { UserQueryRepository } from '../../../../infrastructure/security/repository/user.query-repository';
import { UserCommandRepository } from '../../../../infrastructure/security/repository/user.command-repository';
import { UserCommandRepositoryMock } from '../../../../infrastructure/security/repository/mock/user.command-repository.mock';
import { AppModule } from '../../../../infrastructure/app/app.module';
import { UiHttpModule } from '../../ui-http.module';
import { LoggerModule } from '../../../../infrastructure/logger/logger.module';
import { INestApplication } from '@nestjs/common';

const UUID = '0d66db91-4441-4563-967c-797d767c7288';
const EMAIL = 'somebody@unknow.com';
const PASSWORD = 'changeme';

describe('UserController tests suite', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CqrsModule, SecurityModule, UiHttpModule, LoggerModule],
    })
      .overrideProvider(LoggerAdapterService)
      .useClass(LoggerMock)
      .overrideProvider(UserQueryRepository)
      .useClass(UserQueryRepositoryMock)
      .overrideProvider(UserCommandRepository)
      .useClass(UserCommandRepositoryMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST - should return a UserInterface', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      email: EMAIL,
      password: PASSWORD,
    });
    expect(response.status).toBe(201);
    expect(response.body.email).toBe(EMAIL);
    expect(response.body.status).toBe(1);
    expect(response.body.password).toBe(PASSWORD);
    expect(response.body.uuid).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.createdBy).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
    expect(response.body.updatedBy).toBeDefined();
  });

  it('UPDATE - should return a UserInterface', async () => {
    const response = await request(app.getHttpServer()).put(`/users/${UUID}`).send({
      status: 3,
      email: `${EMAIL}.br`,
    });
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(`${EMAIL}.br`);
    expect(response.body.status).toBe(3);
    expect(response.body.password).toBeDefined();
    expect(response.body.uuid).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.createdBy).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
    expect(response.body.updatedBy).toBeDefined();
  });

  it('DELETE - should return a UserInterface', async () => {
    const response = await request(app.getHttpServer()).delete(`/users/${UUID}`).send();
    expect(response.status).toBe(204);
    expect(response.body).toBeDefined();
  });

  it('POST - should return 400 bad email attribute', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      email: 1,
      password: PASSWORD,
    });
    expect(response.status).toBe(400);
  });

  it('POST - should return 400 bad password attribute', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({
      email: EMAIL,
      password: 1,
    });
    expect(response.status).toBe(400);
  });

  it('POST - should return 400 missing attributes', async () => {
    const response = await request(app.getHttpServer()).post('/users').send({});
    expect(response.status).toBe(400);
  });

  it('UPDATE - should return 400 bad status attribute', async () => {
    const response = await request(app.getHttpServer()).put(`/users/${UUID}`).send({
      status: '3',
      email: `${EMAIL}.br`,
    });
    expect(response.status).toBe(400);
  });

  it('UPDATE - should return 400 bad email attribute', async () => {
    const response = await request(app.getHttpServer()).put(`/users/${UUID}`).send({
      status: 3,
      email: 2,
    });
    expect(response.status).toBe(400);
  });

  it('UPDATE - should return 400 bad email format attribute', async () => {
    const response = await request(app.getHttpServer()).put(`/users/${UUID}`).send({
      status: 3,
      email: 'idontknow',
    });
    expect(response.status).toBe(400);
  });

  it('UPDATE - should return 400 missing attributes', async () => {
    const response = await request(app.getHttpServer()).put(`/users/${UUID}`).send({});
    expect(response.status).toBe(400);
  });

  it('DELETE - should return a UserInterface', async () => {
    const response = await request(app.getHttpServer()).delete(`/users/bad-uuid`);
    expect(response.status).toBe(500);
  });
});
