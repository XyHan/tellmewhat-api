import * as request from 'supertest';
import * as JsonWebToken from 'jsonwebtoken';
import { Test, TestingModule } from '@nestjs/testing';
import { TicketModule } from '../../../../../../infrastructure/ticket/ticket.module';
import { LoggerMock } from '../../../../../../domain/utils/logger/logger.mock';
import { LoggerAdapterService } from '../../../../../../infrastructure/logger/logger-adapter.service';
import { CqrsModule } from '@nestjs/cqrs';
import { TicketQueryRepositoryMock } from '../../../../../../domain/repository/ticket/mock/ticket.query-repository.mock';
import { TicketQueryRepository } from '../../../../../../infrastructure/ticket/repository/ticket/ticket.query-repository';
import { TicketCommandRepository } from '../../../../../../infrastructure/ticket/repository/ticket/ticket.command-repository';
import { TicketCommandRepositoryMock } from '../../../../../../domain/repository/ticket/mock/ticket.command-repository.mock';
import { AppModule } from '../../../../../../infrastructure/app/app.module';
import { UiHttpModule } from '../../../../ui-http.module';
import { LoggerModule } from '../../../../../../infrastructure/logger/logger.module';
import { INestApplication } from '@nestjs/common';
import { UserQueryRepository } from '../../../../../../infrastructure/security/repository/user.query-repository';
import { UserQueryRepositoryMock } from '../../../../../../domain/repository/user/mock/user.query-repository.mock';
import { UserCommandRepositoryMock } from '../../../../../../domain/repository/user/mock/user.command-repository.mock';
import { UserCommandRepository } from '../../../../../../infrastructure/security/repository/user.command-repository';

const UUID = '5e4e03a6-6e6f-4b39-a158-307d1e9082d8';
const SUBJECT = 'Integer sit amet purus a lacus fermentum consectetur nec quis leo.';
const DESCRIPTION = 'Integer sit amet purus a lacus fermentum consectetur nec quis leo. Sed ac ultricies est. Donec egestas laoreet urna eget hendrerit.';

describe('TicketController tests suite', () => {
  let app: INestApplication;
  let token: string;
  let wrongToken: string;
  let badRoleToken: string;

  beforeAll(async () => {
    token = JsonWebToken.sign(
      { uuid: '0d66db91-4441-4563-967c-797d767c7288', email: 'user2@test.com' },
      Buffer.from('changeMeAsSoonAsPossible', 'base64').toString(),
      { algorithm: 'HS256', expiresIn: '1d' }
    );

    wrongToken = JsonWebToken.sign(
      { uuid: 'bad-uuid', email: 'bad-email' },
      Buffer.from('changeMeAsSoonAsPossible', 'base64').toString(),
      { algorithm: 'HS256', expiresIn: '1d' }
    );

    badRoleToken = JsonWebToken.sign(
      { uuid: 'b51b7315-d7ba-49b1-ad7d-ea4c8167b3d0', email: 'user3@test.com' },
      Buffer.from('changeMeAsSoonAsPossible', 'base64').toString(),
      { algorithm: 'HS256', expiresIn: '1d' }
    );

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CqrsModule, TicketModule, UiHttpModule, LoggerModule],
    })
      .overrideProvider(LoggerAdapterService)
      .useClass(LoggerMock)
      .overrideProvider(TicketQueryRepository)
      .useClass(TicketQueryRepositoryMock)
      .overrideProvider(TicketCommandRepository)
      .useClass(TicketCommandRepositoryMock)
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

  it('GET - LISTALL - should return an array of TicketInterface', async () => {
    const response = await request(app.getHttpServer()).get('/tickets').set({ 'Authorization': `Bearer ${token}` });
    expect(response.status).toBe(200);
    expect(response.body.page).toBe(1);
    expect(response.body.pages).toBe(1);
    expect(response.body.total).toBe(2);
    expect(response.body.collection.length).toBe(2);
    expect(response.body.collection[0].uuid).toBe('5e4e03a6-6e6f-4b39-a158-307d1e9082d8');
    expect(response.body.collection[1].uuid).toBe('0d66db91-4441-4563-967c-797d767c7288');
  });

  it('GET - LISTALL - should return a 401', async () => {
    const response = await request(app.getHttpServer()).get('/tickets').set({ 'Authorization': `Bearer ${wrongToken}` });
    expect(response.status).toBe(401);
  });

  it('GET - LISTALL - should return a 403', async () => {
    const response = await request(app.getHttpServer()).get('/tickets').set({ 'Authorization': `Bearer ${badRoleToken}` });
    expect(response.status).toBe(403);
  });

  it('GET - FINDONE - should return a TicketInterface', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tickets/${UUID}`)
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.body.uuid).toBe(UUID);
  });

  it('GET - FINDONE - should return a 401', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tickets/${UUID}`)
      .set({ 'Authorization': `Bearer ${wrongToken}` })
    ;
    expect(response.status).toBe(401);
  });

  it('GET - FINDONE - should return a 403', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tickets/${UUID}`)
      .set({ 'Authorization': `Bearer ${badRoleToken}` })
    ;
    expect(response.status).toBe(403);
  });

  it('POST - should return a TicketInterface', async () => {
    const response = await request(app.getHttpServer())
      .post('/tickets')
      .send({
        subject: SUBJECT
      })
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(201);
    expect(response.body.subject).toBe(SUBJECT);
  });

  it('POST - should return a 401', async () => {
    const response = await request(app.getHttpServer())
      .post('/tickets')
      .send({
        subject: SUBJECT
      })
      .set({ 'Authorization': `Bearer ${wrongToken}` })
    ;
    expect(response.status).toBe(401);
  });

  it('POST - should return 403', async () => {
    const response = await request(app.getHttpServer())
      .post('/tickets')
      .send({
        subject: SUBJECT
      })
      .set({ 'Authorization': `Bearer ${badRoleToken}` })
    ;
    expect(response.status).toBe(403);
  });

  it('UPDATE - should return a TicketInterface', async () => {
    const response = await request(app.getHttpServer())
      .put(`/tickets/${UUID}`)
      .send({
        status: 3,
        subject: SUBJECT,
        description: DESCRIPTION
      })
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(3);
    expect(response.body.subject).toBe(`${SUBJECT} Sed ac ultricies est. Donec egestas laoreet urna eget hendrerit.`);
    expect(response.body.description).toBe('Integer sit amet purus a lacus fermentum consectetur nec quis leo.');
  });

  it('UPDATE - should return a 401', async () => {
    const response = await request(app.getHttpServer())
      .put(`/tickets/${UUID}`)
      .send({
        status: 3,
        subject: SUBJECT,
        description: DESCRIPTION
      })
      .set({ 'Authorization': `Bearer ${wrongToken}` })
    ;
    expect(response.status).toBe(401);
  });

  it('UPDATE - should return a 403', async () => {
    const response = await request(app.getHttpServer())
      .put(`/tickets/${UUID}`)
      .send({
        status: 3,
        subject: SUBJECT,
        description: DESCRIPTION
      })
      .set({ 'Authorization': `Bearer ${badRoleToken}` })
    ;
    expect(response.status).toBe(403);
  });

  it('DELETE - should return a TicketInterface', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/tickets/${UUID}`)
      .send()
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(0);
  });

  it('DELETE - should return a 401', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/tickets/${UUID}`)
      .send()
      .set({ 'Authorization': `Bearer ${wrongToken}` })
    ;
    expect(response.status).toBe(401);
  });

  it('DELETE - should return a 403', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/tickets/${UUID}`)
      .send()
      .set({ 'Authorization': `Bearer ${badRoleToken}` })
    ;
    expect(response.status).toBe(403);
  });

  it('GET - FINDONE - should return a 404', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tickets/bad-uuid`)
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(404);
  });

  it('POST - should return 400 bad subject attribute', async () => {
    const response = await request(app.getHttpServer())
      .post('/tickets')
      .send({
        subject: 1
      })
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(400);
  });

  it('POST - should return 400 missing attributes', async () => {
    const response = await request(app.getHttpServer())
      .post('/tickets')
      .send({})
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(400);
  });

  it('UPDATE - should return 400 bad status attribute', async () => {
    const response = await request(app.getHttpServer())
      .put(`/tickets/${UUID}`)
      .send({
        status: '3',
        subject: SUBJECT,
        description: DESCRIPTION
      })
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(400);
  });

  it('UPDATE - should return 400 bad subject attribute', async () => {
    const response = await request(app.getHttpServer())
      .put(`/tickets/${UUID}`)
      .send({
        status: 3,
        subject: 0,
        description: DESCRIPTION
      })
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(400);
  });

  it('UPDATE - should return 400 bad description attribute', async () => {
    const response = await request(app.getHttpServer())
      .put(`/tickets/${UUID}`)
      .send({
        status: 3,
        subject: SUBJECT,
        description: 0
      })
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(400);
  });

  it('UPDATE - should return 400 missing attributes', async () => {
    const response = await request(app.getHttpServer())
      .put(`/tickets/${UUID}`)
      .send({})
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(400);
  });

  it('DELETE - should return a bad request status', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/tickets/bad-uuid`)
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(400);
  });
});
