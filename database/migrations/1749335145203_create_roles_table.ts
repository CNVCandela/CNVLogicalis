import { BaseSchema } from '@adonisjs/lucid/schema'
import { faker } from '@faker-js/faker';

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.uuid('uuid').notNullable().unique()
      table.integer('state').defaultTo(0).notNullable()
      table.integer('type').defaultTo(0).notNullable()
      table.integer('situation').defaultTo(0).notNullable()
      table.string('name').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    });

    await this.defer(async (db) => {
      await db.table(this.tableName).insert([
        {
          uuid: faker.string.uuid(),
          state: 1,
          type: 1,
          situation: 1,
          name: 'Super Admin'
        },
        {
          uuid: faker.string.uuid(),
          state: 1,
          type: 1,
          situation: 1,
          name: 'Admin'
        },
        {
          uuid: faker.string.uuid(),
          state: 1,
          type: 1,
          situation: 1,
          name: 'Supervisor'
        },
        {
          uuid: faker.string.uuid(),
          state: 1,
          type: 1,
          situation: 1,
          name: 'User'
        },
      ]);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
