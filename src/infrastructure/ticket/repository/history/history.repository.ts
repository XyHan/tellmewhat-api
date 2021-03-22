import { EntityRepository, Repository } from 'typeorm';
import { HistoryEntity } from '../../entity/history.entity';

@EntityRepository(HistoryEntity)
export class HistoryRepository extends Repository<HistoryEntity> {}
