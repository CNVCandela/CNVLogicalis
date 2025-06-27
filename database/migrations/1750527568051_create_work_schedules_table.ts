import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'work_schedules'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.uuid('uuid').notNullable().unique()
      table.integer('estado').defaultTo(1)
      table.integer('tipo').defaultTo(1)
      table.integer('situacion').defaultTo(1)
      table.integer('state').defaultTo(1)
      table.integer('user_id').defaultTo(0)
      table.string('name').nullable()
      table.string('module').nullable()
      table.string('cfd').nullable()
      table.string('cfd_3cx').nullable()
      table.string('option').nullable()
      table.string('dst01').nullable()
      table.string('dst02').nullable()

      table.boolean('day01').defaultTo(false)
      table.time('day01_hour_init').defaultTo('00:00:00')
      table.time('day01_hour_due').defaultTo('00:00:00')
      table.string('day01_dst01').defaultTo('0')
      table.string('day01_dst02').defaultTo('0')

      table.boolean('day02').defaultTo(false)
      table.time('day02_hour_init').defaultTo('00:00:00')
      table.time('day02_hour_due').defaultTo('00:00:00')
      table.string('day02_dst01').defaultTo('0')
      table.string('day02_dst02').defaultTo('0')

      table.boolean('day03').defaultTo(false)
      table.time('day03_hour_init').defaultTo('00:00:00')
      table.time('day03_hour_due').defaultTo('00:00:00')
      table.string('day03_dst01').defaultTo('0')
      table.string('day03_dst02').defaultTo('0')

      table.boolean('day04').defaultTo(false)
      table.time('day04_hour_init').defaultTo('00:00:00')
      table.time('day04_hour_due').defaultTo('00:00:00')
      table.string('day04_dst01').defaultTo('0')
      table.string('day04_dst02').defaultTo('0')

      table.boolean('day05').defaultTo(false)
      table.time('day05_hour_init').defaultTo('00:00:00')
      table.time('day05_hour_due').defaultTo('00:00:00')
      table.string('day05_dst01').defaultTo('0')
      table.string('day05_dst02').defaultTo('0')

      table.boolean('day06').defaultTo(false)
      table.time('day06_hour_init').defaultTo('00:00:00')
      table.time('day06_hour_due').defaultTo('00:00:00')
      table.string('day06_dst01').defaultTo('0')
      table.string('day06_dst02').defaultTo('0')

      table.boolean('day07').defaultTo(false)
      table.time('day07_hour_init').defaultTo('00:00:00')
      table.time('day07_hour_due').defaultTo('00:00:00')
      table.string('day07_dst01').defaultTo('0')
      table.string('day07_dst02').defaultTo('0')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
