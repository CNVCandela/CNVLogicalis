import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import { v4 as uuidv4 } from 'uuid'

export default class Holiday extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @beforeCreate()
  public static assignUuid(holiday: Holiday) {
    holiday.uuid = uuidv4()
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

  @column.date({ columnName: 'date_issue' })
  declare dateIssue: DateTime | null

  @column({ columnName: 'date_start' })
  declare dateStart: string | null

  @column({ columnName: 'date_end' })
  declare dateEnd: string | null

  @column()
  declare queue01: string | null

  @column()
  declare queue02: string | null

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
