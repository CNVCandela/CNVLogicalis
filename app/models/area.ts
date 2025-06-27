import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, beforeCreate } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { v4 as uuidv4 } from "uuid";

export default class Area extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @beforeCreate()
  public static assignUuid(area: Area) {
    area.uuid = uuidv4();
  }
  @column()
  declare uuid: string

  @column()
  declare state: number

  @column()
  declare type: number

  @column()
  declare situation: number

  @column()
  declare name: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => User, {
    foreignKey: 'areaId',
    localKey: 'id'
  })
  declare users: HasMany<typeof User>
}
