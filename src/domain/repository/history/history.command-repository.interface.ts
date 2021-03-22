import { HistoryInterface } from '../../model/ticket/history.model';

export interface HistoryCommandRepositoryInterface {
  create(comment: HistoryInterface): Promise<HistoryInterface>;
  update(comment: HistoryInterface): Promise<HistoryInterface>;
  delete(comment: HistoryInterface): Promise<HistoryInterface>;
}
