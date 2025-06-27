import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'validate_api_rests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.uuid('uuid').notNullable().unique()
      table.integer('apirest').defaultTo(0);
      table.integer('state').defaultTo(0);
      table.integer('type').defaultTo(0);
      table.dateTime('creation');
      table.text('data').nullable();
      table.text('result').nullable();
      table.string('cfd').nullable();
      table.string('module').nullable();
      table.string('did').nullable();
      table.string('ani').nullable();
      table.string('dnis').nullable();
      table.string('extensionfrom').nullable();
      table.string('extensionto').nullable();
      table.string('status').nullable();
      table.string('day').nullable();
      table.string('hour').nullable();
      table.string('message').nullable();
      table.time('time').nullable();
      table.date('date_issue');
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
