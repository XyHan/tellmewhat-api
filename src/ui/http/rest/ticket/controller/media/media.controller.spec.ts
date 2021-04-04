import * as request from 'supertest';
import * as JsonWebToken from 'jsonwebtoken';
import { Test, TestingModule } from '@nestjs/testing';
import { TicketModule } from '../../../../../../infrastructure/ticket/ticket.module';
import { LoggerMock } from '../../../../../../domain/utils/logger/logger.mock';
import { LoggerAdapterService } from '../../../../../../infrastructure/logger/logger-adapter.service';
import { CqrsModule } from '@nestjs/cqrs';
import { MediaQueryRepositoryMock } from '../../../../../../domain/repository/media/mock/media.query-repository.mock';
import { MediaQueryRepository } from '../../../../../../infrastructure/ticket/repository/media/media.query-repository';
import { MediaCommandRepository } from '../../../../../../infrastructure/ticket/repository/media/media.command-repository';
import { MediaCommandRepositoryMock } from '../../../../../../domain/repository/media/mock/media.command-repository.mock';
import { AppModule } from '../../../../../../infrastructure/app/app.module';
import { UiHttpModule } from '../../../../ui-http.module';
import { LoggerModule } from '../../../../../../infrastructure/logger/logger.module';
import { INestApplication } from '@nestjs/common';
import { UserQueryRepository } from '../../../../../../infrastructure/security/repository/user.query-repository';
import { UserQueryRepositoryMock } from '../../../../../../domain/repository/user/mock/user.query-repository.mock';
import { UserCommandRepositoryMock } from '../../../../../../domain/repository/user/mock/user.command-repository.mock';
import { UserCommandRepository } from '../../../../../../infrastructure/security/repository/user.command-repository';
import { TicketQueryRepository } from '../../../../../../infrastructure/ticket/repository/ticket/ticket.query-repository';
import { TicketQueryRepositoryMock } from '../../../../../../domain/repository/ticket/mock/ticket.query-repository.mock';
import { TicketCommandRepository } from '../../../../../../infrastructure/ticket/repository/ticket/ticket.command-repository';
import { TicketCommandRepositoryMock } from '../../../../../../domain/repository/ticket/mock/ticket.command-repository.mock';

const UUID = '204df646-3b8a-450b-b15c-fab854149136';
const TICKET_UUID = '5e4e03a6-6e6f-4b39-a158-307d1e9082d8';
const FILE = `${__dirname}/test/test.txt`;

describe('MediaController tests suite', () => {
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
      .overrideProvider(MediaQueryRepository)
      .useClass(MediaQueryRepositoryMock)
      .overrideProvider(MediaCommandRepository)
      .useClass(MediaCommandRepositoryMock)
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

  it('GET - LISTALL - should return an array of MediaInterface', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tickets/${TICKET_UUID}/media`)
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(200);
    expect(response.body.page).toBe(1);
    expect(response.body.pages).toBe(1);
    expect(response.body.total).toBe(2);
    expect(response.body.collection.length).toBe(2);
    expect(response.body.collection[0].uuid).toBe('e1844d91-0c55-433e-a907-db2f29de3303');
    expect(response.body.collection[1].uuid).toBe('204df646-3b8a-450b-b15c-fab854149136');
  });

  it('GET - LISTALL - should return a 401', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tickets/${TICKET_UUID}/media`)
      .set({ 'Authorization': `Bearer ${wrongToken}` })
    ;
    expect(response.status).toBe(401);
  });

  it('GET - LISTALL - should return a 403', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tickets/${TICKET_UUID}/media`)
      .set({ 'Authorization': `Bearer ${badRoleToken}` })
    ;
    expect(response.status).toBe(403);
  });

  it('GET - FINDONE - should return a MediaInterface', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tickets/${TICKET_UUID}/media/${UUID}`)
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.body.uuid).toBe(UUID);
  });

  it('GET - FINDONE - should return a 401', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tickets/${TICKET_UUID}/media/${UUID}`)
      .set({ 'Authorization': `Bearer ${wrongToken}` })
    ;
    expect(response.status).toBe(401);
  });

  it('GET - FINDONE - should return a 403', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tickets/${TICKET_UUID}/media/${UUID}`)
      .set({ 'Authorization': `Bearer ${badRoleToken}` })
    ;
    expect(response.status).toBe(403);
  });

  it('POST - should return a MediaInterface', async () => {
    const response = await request(app.getHttpServer())
      .post(`/tickets/${TICKET_UUID}/media`)
      .attach('file', FILE)
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(201);
    expect(response.body.ticket.uuid).toBe(TICKET_UUID);
  });

  it('POST - should return a 401', async () => {
    const response = await request(app.getHttpServer())
      .post(`/tickets/${TICKET_UUID}/media`)
      .attach('file', FILE)
      .set({ 'Authorization': `Bearer ${wrongToken}` })
    ;
    expect(response.status).toBe(401);
  });

  it('POST - should return 403', async () => {
    const response = await request(app.getHttpServer())
      .post(`/tickets/${TICKET_UUID}/media`)
      .attach('file', FILE)
      .set({ 'Authorization': `Bearer ${badRoleToken}` })
    ;
    expect(response.status).toBe(403);
  });

  it('DELETE - should return a MediaInterface', async () => {
    const postResponse = await request(app.getHttpServer())
      .post(`/tickets/${TICKET_UUID}/media`)
      .attach('file', FILE)
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    const response = await request(app.getHttpServer())
      .delete(`/tickets/${TICKET_UUID}/media/${postResponse.body.uuid}`)
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(204);
  });

  it('DELETE - should return a 401', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/tickets/${TICKET_UUID}/media/${UUID}`)
      .set({ 'Authorization': `Bearer ${wrongToken}` })
    ;
    expect(response.status).toBe(401);
  });

  it('DELETE - should return a 403', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/tickets/${TICKET_UUID}/media/${UUID}`)
      .set({ 'Authorization': `Bearer ${badRoleToken}` })
    ;
    expect(response.status).toBe(403);
  });

  it('GET - FINDONE - should return a 404', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tickets/${TICKET_UUID}/media/bad-uuid`)
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(404);
  });

  it('POST - should return 400 bad subject attribute', async () => {
    const response = await request(app.getHttpServer())
      .post(`/tickets/${TICKET_UUID}/media`)
      .send({ content: 1 })
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(400);
  });

  it('POST - should return 400 missing attributes', async () => {
    const response = await request(app.getHttpServer())
      .post(`/tickets/${TICKET_UUID}/media`)
      .send({})
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(400);
  });

  it('DELETE - should return a bad request status', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/tickets/${TICKET_UUID}/media/bad-uuid`)
      .set({ 'Authorization': `Bearer ${token}` })
    ;
    expect(response.status).toBe(400);
  });
});
