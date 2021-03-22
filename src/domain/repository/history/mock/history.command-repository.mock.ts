import { HistoryCommandRepositoryInterface } from '../history.command-repository.interface';
import { HistoryInterface } from '../../../model/ticket/history.model';
import { HistoryRepositoryException } from '../history.repository.exception';
import { HistoryFixtures } from '../../../fixtures/history.fixtures';

export class HistoryCommandRepositoryMock implements HistoryCommandRepositoryInterface {
  public async create(history: HistoryInterface): Promise<HistoryInterface> {
    this.isValidHistory(history);
    try {
      HistoryFixtures.saveHistory(history);
      return Promise.resolve(history);
    } catch (e) {
      const message: string = `HistoryCommandRepository - Error on create history`;
      throw new HistoryRepositoryException(message);
    }
  }

  private isValidHistory(history: HistoryInterface): boolean {
    if (!history.ticket || !history.type) {
      const message: string = `HistoryCommandRepository - Error on create history - ticket or type cannot be empty`;
      throw new HistoryRepositoryException(message);
    }
    return true;
  }
}
