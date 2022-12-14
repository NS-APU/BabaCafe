import { BaseEntityAddHashId } from 'src/common/base-entity-add-hash-id';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Producer extends BaseEntityAddHashId {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ default: null, comment: '農業法人名' })
  name: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  tel: string;

  @Column({ default: null })
  image: string;

  @Column({ default: null })
  description: string;

  @Column({ default: null })
  zipCode: string;

  @Column({ default: null })
  address: string;

  @Column({ default: null })
  address2: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  @OneToOne(() => User, (user) => user.producer)
  @JoinColumn()
  user: User;

  @OneToMany(() => Product, (products) => products.producer)
  products: Product[];

  convertTProducer(): TProducer {
    return {
      ...this,
      id: this.hashId,
      products: this.products?.map((product) => product.convertTProduct) ?? [],
    };
  }
}

export type TProducer = Pick<
  Producer,
  | 'email'
  | 'tel'
  | 'zipCode'
  | 'address'
  | 'address2'
  | 'description'
  | 'image'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
> & {
  id: string;
  user: User;
  products: Product[];
};
