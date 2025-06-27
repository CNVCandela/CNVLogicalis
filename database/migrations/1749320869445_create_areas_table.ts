import { BaseSchema } from '@adonisjs/lucid/schema';
import { faker } from '@faker-js/faker';

export default class extends BaseSchema {
  protected tableName = 'areas';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable();
      table.uuid('uuid').notNullable().unique();
      table.integer('state').defaultTo(0).notNullable();
      table.integer('type').defaultTo(0).notNullable();
      table.integer('situation').defaultTo(0).notNullable();
      table.string('name').nullable();

      table.timestamp('created_at').defaultTo(this.now());
      table.timestamp('updated_at').nullable();
    });

    await this.defer(async (db) => {
      await db.table(this.tableName).insert([
        {
          uuid: faker.string.uuid(),
          state: 1,
          type: 1,
          situation: 1,
          name: 'CXC Voice',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          uuid: faker.string.uuid(),
          state: 1,
          type: 1,
          situation: 1,
          name: 'CXC Data',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          uuid: faker.string.uuid(),
          state: 1,
          type: 1,
          situation: 1,
          name: 'CXC Mexico',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          uuid: faker.string.uuid(),
          state: 1,
          type: 1,
          situation: 1,
          name: 'CXC Peru',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          uuid: faker.string.uuid(),
          state: 1,
          type: 1,
          situation: 1,
          name: 'CXC US-CA',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          uuid: faker.string.uuid(),
          state: 1,
          type: 1,
          situation: 1,
          name: 'CXC Cono Sur',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
