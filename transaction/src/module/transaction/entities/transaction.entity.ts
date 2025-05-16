import { AbstractEntity } from '../../database/abstract.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionType } from '../transaction.types';

@Entity({
  name: 'transaction',
})
export class TransactionEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Идентификатор транзакции',
    name: 'trans_id',
  })
  readonly transId: string;

  @Column('varchar', {
    comment: 'Идентификатор пользователя, совершающего транзакцию',
    name: 'user_id',
    nullable: false,
  })
  userId: string;

  @Column('varchar', {
    comment: 'Сумма транзакции',
    nullable: false,
  })
  amount: string;

  @Column('enum', {
    comment: 'Тип транзакции',
    name: 'type',
    nullable: false,
    enum: TransactionType,
  })
  type: TransactionType;
}
