import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('system_consolidation_define')
export class SystemConsolidationDefine extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'ID' })
  readonly id!: string;

  @Column({ comment: '名称', type: 'varchar', length: 50 })
  name!: string;

  @Column({ comment: '衝撃度合い', type: 'int', name: 'shock_level' })
  shockLevel!: number;
}
