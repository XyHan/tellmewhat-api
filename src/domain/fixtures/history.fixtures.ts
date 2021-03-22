import { HistoryInterface } from '../model/ticket/history.model';

export const HISTORY_COLLECTION: HistoryInterface[] = [];

export class HistoryFixtures {
  private static readonly _historyCollection: HistoryInterface[] = HISTORY_COLLECTION;

  public static get historyCollection(): HistoryInterface[] {
    return this._historyCollection;
  }

  public static saveHistory(history: HistoryInterface): void {
    this._historyCollection.push(history);
  }
}
