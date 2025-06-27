import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, belongsTo, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Area from './area.js'
import Role from './role.js'
import { v4 as uuidv4 } from "uuid";

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @beforeCreate()
  public static assignUuid(user: User) {
    user.uuid = uuidv4();
  }
  @column()
  declare uuid: string
  
  @column({ columnName: 'role_id' })
  declare roleId: number

  @column({ columnName: 'area_id' })
  declare areaId: number

  @column()
  declare state: number

  @column()
  declare type: number

  @column()
  declare situation: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare recover: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Area, {
    foreignKey: 'areaId',
    localKey: 'id'
  })
  declare area: BelongsTo<typeof Area>

  @belongsTo(() => Role, {
    foreignKey: 'roleId',
    localKey: 'id'
  })
  declare role: BelongsTo<typeof Role>
}
