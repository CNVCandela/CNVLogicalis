import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from 'uuid'

export default class ValidateApiRest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @beforeCreate()
  public static assignUuid(validateApiRest: ValidateApiRest) {
    validateApiRest.uuid = uuidv4()
  }

  @column()
  declare apirest: number

  @column()
  declare state: number

  @column()
  declare type: number

  @column.dateTime()
  declare creation: DateTime | null

  @column()
  declare data: string | null

  @column()
  declare result: string | null

  @column()
  declare cfd: string | null

  @column()
  declare module: string | null

  @column()
  declare did: string | null

  @column()
  declare ani: string | null

  @column()
  declare dnis: string | null

  @column()
  declare extensionfrom: string | null

  @column()
  declare extensionto: string | null

  @column()
  declare status: string | null

  @column()
  declare day: string | null

  @column()
  declare hour: string | null

  @column()
  declare message: string | null

  @column()
  declare time: string | null

  @column()
  declare dateIssue: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}