  import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

  @Entity()
  export class TokenInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    currentTimestamp: Date;

    @Column()
    routePath: string;

    @Column({ default: false })
    successful: boolean;
  }
