import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('uuid').notNullable()
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

    await this.db.raw('ALTER SEQUENCE users_id_seq RESTART WITH 101');

  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
