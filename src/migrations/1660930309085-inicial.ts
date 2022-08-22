import { MigrationInterface, QueryRunner } from 'typeorm';

export class inicial1660930309085 implements MigrationInterface {
  name = 'inicial1660930309085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`palestrante\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`nome\` varchar(100) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                UNIQUE INDEX \`IDX_86ad4672a3de81664516100857\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX \`IDX_86ad4672a3de81664516100857\` ON \`palestrante\`
        `);
    await queryRunner.query(`
            DROP TABLE \`palestrante\`
        `);
  }
}
