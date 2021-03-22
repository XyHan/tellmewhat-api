import { findAllOptions } from '../find-all-options.type';
import { HistoryInterface } from '../../model/ticket/history.model';

export interface HistoryQueryRepositoryInterface {
  findAll(options: findAllOptions): Promise<[HistoryInterface[], number]>;
}
