import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { TicketModule } from '../../../../infrastructure/ticket/ticket.module';
import { LoggerMock } from '../../../../infrastructure/logger/logger.mock';
import { LoggerAdapterService } from '../../../../infrastructure/logger/logger-adapter.service';
import { CqrsModule } from '@nestjs/cqrs';
import { TicketQueryRepositoryMock } from '../../../../infrastructure/ticket/repository/ticket/mock/ticket.query-repository.mock';
import { TicketQueryRepository } from '../../../../infrastructure/ticket/repository/ticket/ticket.query-repository';
import { TicketCommandRepository } from '../../../../infrastructure/ticket/repository/ticket/ticket.command-repository';
import { TicketCommandRepositoryMock } from '../../../../infrastructure/ticket/repository/ticket/mock/ticket.command-repository.mock';
import { AppModule } from '../../../../infrastructure/app/app.module';
import { UiHttpModule } from '../../ui-http.module';
import { LoggerModule } from '../../../../infrastructure/logger/logger.module';
import { INestApplication } from '@nestjs/common';

const UUID = '5e4e03a6-6e6f-4b39-a158-307d1e9082d8';
const SUBJECT = 'Integer sit amet purus a lacus fermentum consectetur nec quis leo.';
const DESCRIPTION = 'Integer sit amet purus a lacus fermentum consectetur nec quis leo. Sed ac ultricies est. Donec egestas laoreet urna eget hendrerit.';

describe('TicketController tests suite', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CqrsModule, TicketModule, UiHttpModule, LoggerModule],
    })
      .overrideProvider(LoggerAdapterService)
      .useClass(LoggerMock)
      .overrideProvider(TicketQueryRepository)
      .useClass(TicketQueryRepositoryMock)
      .overrideProvider(TicketCommandRepository)
      .useClass(TicketCommandRepositoryMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET - LISTALL - should return an array of TicketInterface', async () => {
    const response = await request(app.getHttpServer()).get('/tickets');
    expect(response.status).toBe(200);
    expect(response.body.page).toBe(1);
    expect(response.body.pages).toBe(1);
    expect(response.body.total).toBe(2);
    expect(response.body.collection.length).toBe(2);
    expect(response.body.collection[0].uuid).toBe('5e4e03a6-6e6f-4b39-a158-307d1e9082d8');
    expect(response.body.collection[1].uuid).toBe('0d66db91-4441-4563-967c-797d767c7288');
  });

  it('GET - FINDONE - should return a TicketInterface', async () => {
    const response = await request(app.getHttpServer()).get(`/tickets/${UUID}`);
    expect(response.body.uuid).toBe(UUID);
  });

  it('POST - ADD - should return a TicketInterface', async () => {
    const response = await request(app.getHttpServer()).post('/tickets').send({
      subject: SUBJECT,
      description: DESCRIPTION
    });
    expect(response.status).toBe(201);
    expect(response.body.subject).toBe(SUBJECT);
    expect(response.body.description).toBe(DESCRIPTION);
  });

  it('POST - UPDATE - should return a TicketInterface', async () => {
    const response = await request(app.getHttpServer()).put(`/tickets/${UUID}`).send({
      status: 3,
      subject: SUBJECT,
      description: DESCRIPTION
    });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(3);
    expect(response.body.subject).toBe(`${SUBJECT} Sed ac ultricies est. Donec egestas laoreet urna eget hendrerit.`);
    expect(response.body.description).toBe('Integer sit amet purus a lacus fermentum consectetur nec quis leo.');
  });

  it('POST - DELETE - should return a TicketInterface', async () => {
    const response = await request(app.getHttpServer()).delete(`/tickets/${UUID}`).send();
    expect(response.status).toBe(204);
    expect(response.body).toBeDefined();
  });

  it('GET - FINDONE - should return a 404', async () => {
    const response = await request(app.getHttpServer()).get(`/tickets/bad-uuid`);
    expect(response.status).toBe(404);
  });

  it('POST - ADD - should return 400 bad subject attribute', async () => {
    const response = await request(app.getHttpServer()).post('/tickets').send({
      subject: 1,
      description: DESCRIPTION
    });
    expect(response.status).toBe(400);
  });

  it('POST - ADD - should return 400 bad description attribute', async () => {
    const response = await request(app.getHttpServer()).post('/tickets').send({
      subject: SUBJECT,
      description: 1
    });
    expect(response.status).toBe(400);
  });

  it('POST - ADD - should return 400 missing attributes', async () => {
    const response = await request(app.getHttpServer()).post('/tickets').send({});
    expect(response.status).toBe(400);
  });

  it('POST - UPDATE - should return 400 bad status attribute', async () => {
    const response = await request(app.getHttpServer()).put(`/tickets/${UUID}`).send({
      status: '3',
      subject: SUBJECT,
      description: DESCRIPTION
    });
    expect(response.status).toBe(400);
  });

  it('POST - UPDATE - should return 400 bad subject attribute', async () => {
    const response = await request(app.getHttpServer()).put(`/tickets/${UUID}`).send({
      status: 3,
      subject: 0,
      description: DESCRIPTION
    });
    expect(response.status).toBe(400);
  });

  it('POST - UPDATE - should return 400 bad description attribute', async () => {
    const response = await request(app.getHttpServer()).put(`/tickets/${UUID}`).send({
      status: 3,
      subject: SUBJECT,
      description: 0
    });
    expect(response.status).toBe(400);
  });

  it('POST - UPDATE - should return 400 missing attributes', async () => {
    const response = await request(app.getHttpServer()).put(`/tickets/${UUID}`).send({});
    expect(response.status).toBe(400);
  });

  it('POST - DELETE - should return a TicketInterface', async () => {
    const response = await request(app.getHttpServer()).delete(`/tickets/bad-uuid`);
    expect(response.status).toBe(500);
  });
});
