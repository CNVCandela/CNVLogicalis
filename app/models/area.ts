import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Area extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

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
