import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'holidays'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.uuid('uuid').notNullable().unique()
      table.integer('state').defaultTo(0).notNullable()
      table.integer('type').defaultTo(0).notNullable()
      table.integer('situation').defaultTo(0).notNullable()
      table.integer('user_id').defaultTo(0).notNullable()
      table.string('name').nullable()
      table.date('date_issue').nullable()
      table.date('date_start').nullable()
      table.date('date_end').nullable()
      table.string('queue01').nullable()
      table.string('queue02').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}