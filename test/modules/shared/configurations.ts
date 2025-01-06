import { Auth } from '@auth/context/infrastructure';
import { JwtService } from '@nestjs/jwt';
import { User } from '@users/context/infrastructure';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Auth],
  synchronize: false,
});

export class E2EConfigurations {
  private readonly client: DataSource;
  private readonly jwtService: JwtService;

  constructor() {
    this.client = dataSource;
    this.jwtService = new JwtService({
      secret: process.env.TOKEN_SECRET || 'default_secret',
    });
  }

  async initialize(): Promise<void> {
    if (!this.client.isInitialized) {
      await this.client.initialize();
    }
  }
  async cleanDB(): Promise<void> {
    const entities = this.client.entityMetadatas;
    for (const entity of entities) {
      const repository = this.client.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    }
  }

  async getToken(): Promise<string> {
    return this.jwtService.sign({ data: 'auth_test_e2e' });
  }
}
