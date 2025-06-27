import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import { v4 as uuidv4 } from 'uuid'

export default class WorkSchedule extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @beforeCreate()
  public static assignUuid(workSchedule: WorkSchedule) {
    workSchedule.uuid = uuidv4()
  }

  @column()
  declare estado: number

  @column()
  declare tipo: number

  @column()
  declare situacion: number

  @column()
  declare state: number

  @column()
  declare userId: number

  @column()
  declare name: string | null

  @column()
  declare module: string | null

  @column()
  declare cfd: string | null

  @column({ columnName: 'cfd_3cx' })
  declare cfd_3cx: string | null

  @column()
  declare option: string | null

  @column({ columnName: 'dst01' })
  declare dst01: string | null

  @column({ columnName: 'dst02' })
  declare dst02: string | null

  // Día 1
  @column({ columnName: 'day01' })
  declare day01: boolean

  @column({ columnName: 'day01_hour_init' })
  declare day01_hour_init: string

  @column({ columnName: 'day01_hour_due' })
  declare day01_hour_due: string

  @column({ columnName: 'day01_dst01' })
  declare day01_dst01: string

  @column({ columnName: 'day01_dst02' })
  declare day01_dst02: string

  // Día 2
  @column({ columnName: 'day02' })
  declare day02: boolean

  @column({ columnName: 'day02_hour_init' })
  declare day02_hour_init: string

  @column({ columnName: 'day02_hour_due' })
  declare day02_hour_due: string

  @column({ columnName: 'day02_dst01' })
  declare day02_dst01: string

  @column({ columnName: 'day02_dst02' })
  declare day02_dst02: string

  // Día 3
  @column({ columnName: 'day03' })
  declare day03: boolean

  @column({ columnName: 'day03_hour_init' })
  declare day03_hour_init: string

  @column({ columnName: 'day03_hour_due' })
  declare day03_hour_due: string

  @column({ columnName: 'day03_dst01' })
  declare day03_dst01: string

  @column({ columnName: 'day03_dst02' })
  declare day03_dst02: string

  // Día 4
  @column({ columnName: 'day04' })
  declare day04: boolean

  @column({ columnName: 'day04_hour_init' })
  declare day04_hour_init: string

  @column({ columnName: 'day04_hour_due' })
  declare day04_hour_due: string

  @column({ columnName: 'day04_dst01' })
  declare day04_dst01: string

  @column({ columnName: 'day04_dst02' })
  declare day04_dst02: string

  // Día 5
  @column({ columnName: 'day05' })
  declare day05: boolean

  @column({ columnName: 'day05_hour_init' })
  declare day05_hour_init: string

  @column({ columnName: 'day05_hour_due' })
  declare day05_hour_due: string

  @column({ columnName: 'day05_dst01' })
  declare day05_dst01: string

  @column({ columnName: 'day05_dst02' })
  declare day05_dst02: string

  // Día 6
  @column({ columnName: 'day06' })
  declare day06: boolean

  @column({ columnName: 'day06_hour_init' })
  declare day06_hour_init: string

  @column({ columnName: 'day06_hour_due' })
  declare day06_hour_due: string

  @column({ columnName: 'day06_dst01' })
  declare day06_dst01: string

  @column({ columnName: 'day06_dst02' })
  declare day06_dst02: string

  // Día 7
  @column({ columnName: 'day07' })
  declare day07: boolean

  @column({ columnName: 'day07_hour_init' })
  declare day07_hour_init: string

  @column({ columnName: 'day07_hour_due' })
  declare day07_hour_due: string

  @column({ columnName: 'day07_dst01' })
  declare day07_dst01: string

  @column({ columnName: 'day07_dst02' })
  declare day07_dst02: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => User, {
    foreignKey: 'userId',
    localKey: 'id'
  })
  declare user: BelongsTo<typeof User>
}
