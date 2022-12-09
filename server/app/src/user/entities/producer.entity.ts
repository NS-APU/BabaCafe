import { Product } from 'src/product/entities/product.entity';
import {
  BaseEntity,
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
export class Producer extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  readonly id: number;

  @Column({ default: null })
  hashId: string;

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
}