import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from "./schema"

@Injectable()
export class UsersService {
    constructor(@Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>) { }

    async getAllUsers() {
        return this.database.query.usersTable.findMany()
    }

    async createUser(user:typeof schema.usersTable.$inferInsert){
        console.log("Inside service")
        return await this.database.insert(schema.usersTable).values(user).returning()
    }
}
