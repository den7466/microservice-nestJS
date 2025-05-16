import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
@Index(['login', 'phone'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Идентификатор пользователя',
    name: 'user_id',
  })
  readonly userId: string;

  @Column('varchar', {
    comment: 'Номер телефона',
    nullable: false,
    length: 20,
  })
  phone: string;

  @Index()
  @Column('varchar', {
    comment: 'Логин пользователя',
    nullable: false,
    length: 20,
  })
  login: string;

  @Column('varchar', {
    comment: 'Имя пользователя',
  })
  firstName: string;

  @Column('varchar', {
    comment: 'Фамилия пользователя',
  })
  lastName: string;

  @Column('varchar', {
    comment: 'Хеш пароля',
  })
  passwordHash: string;

  @Column('varchar', {
    comment: 'Баланс пользователя',
    nullable: false,
    default: '0',
  })
  balance: string;

  @Column('boolean', {
    comment: 'Был ли удален аккаунт',
    nullable: true,
    default: false,
  })
  isDeleted: boolean;
}
