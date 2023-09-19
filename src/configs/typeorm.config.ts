import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'naro',
    database: 'boadr-app',
    entities: [__dirname + '/../**/*.entitiy.{js,ts}'],
    synchronize: true
}