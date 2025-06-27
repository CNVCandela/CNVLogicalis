import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from "uuid";

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @beforeCreate()
  public static assignUuid(role: Role) {
    role.uuid = uuidv4();
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
}
