import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Rol extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare state: number

  @column()
  declare type: number

  @column()
  declare situation: number

  @column()
  declare fullName: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
