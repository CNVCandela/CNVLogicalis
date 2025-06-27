import { BaseSchema } from '@adonisjs/lucid/schema'
import { faker } from '@faker-js/faker'
import Hash from '@adonisjs/core/services/hash'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.uuid('uuid').notNullable().unique()
      table.integer('state').defaultTo(0).notNullable()
      table.integer('type').defaultTo(0).notNullable()
      table.integer('situation').defaultTo(0).notNullable()
      table.integer('role_id').defaultTo(0).notNullable()
      table.integer('area_id').defaultTo(0).notNullable()

      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('recover').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
    await this.defer(async (db) => {
      await db.table(this.tableName).insert([
        {
          id: 100,
          uuid: faker.string.uuid(),
          state: 1,
          type: 1,
          situation: 1,
          role_id: 1,
          area_id: 1,
          full_name: 'CXC Voice Team',
          email: 'cxc-voiceteam@convergia.io',
          password: await Hash.make('cxcVoiceTeam2025'),
          recover: 'cxcVoiceTeam2025',
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);
    });

    await this.defer(async (db) => {
      await db.rawQuery('ALTER SEQUENCE users_id_seq RESTART WITH 101')
    })

  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
