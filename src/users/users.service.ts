import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from "../../src/database/database-connection";
import * as schema from "./schema"
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
    constructor(@Inject(DATABASE_CONNECTION) private readonly database: NodePgDatabase<typeof schema>) { }

    async getAllUsers() {
        return this.database.query.usersTable.findMany()
    }

    async createUser(user: typeof schema.usersTable.$inferInsert) {
        const existingUser = (await this.database
            .select()
            .from(schema.usersTable)
            .where(eq(schema.usersTable.email, user.email))).at(0)

        if (existingUser) {
            throw new ConflictException('A user with this email already exists.');
        }
        const newUser = await this.database.insert(schema.usersTable).values(user).returning();
        return newUser.at(0)
    }


    async getUser(id: number) {
        let user = (await this.database.select().from(schema.usersTable).where(eq(schema.usersTable.id, id))).at(0)
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`)
        }
        return user
    }
}
