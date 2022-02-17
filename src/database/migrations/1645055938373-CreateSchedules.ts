import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSchedules1645055938373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'schedules',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',                        
                    },
                    {
                        name: 'owner_id',
                        type: 'varchar',
                    },
                    {
                        name: 'rival_id',
                        type: 'varchar',
                    },
                    {
                        name: 'date',
                        type: 'timestamp',
                    },   
                    {
                        name: 'status',
                        type: 'varchar',
                    },                
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },                    
                ],
                foreignKeys: [
                    {
                        name: 'fk_schedules_owner',
                        columnNames: ['owner_id'],
                        referencedTableName: 'user',
                        referencedColumnNames: ['id'],
                    },
                    {
                        name: 'fk_schedules_rival',
                        columnNames: ['rival_id'],
                        referencedTableName: 'user',
                        referencedColumnNames: ['id'],
                    },
                ],


            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('schedules');
    }

}
