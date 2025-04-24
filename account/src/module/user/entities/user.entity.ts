import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
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
    comment: 'Соль пароля',
  })
  passwordSalt: string;
}
